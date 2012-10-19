<?php
/**
 * MoIP - Moip Payment Module
 *
 * @title      Magento -> Custom Payment Module for Moip (Brazil)
 * @category   Payment Gateway
 * @package    O2TI_Moip
 * @author     MoIP Pagamentos S/a
 * @copyright  Copyright (c) 2010 MoIP Pagamentos S/A
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class O2TI_Moip_StandardController extends Mage_Core_Controller_Front_Action {

    /**
     * Order instance
     */
    protected $_order;

    public function getOrder() {
        if ($this->_order == null) {

        }
        return $this->_order;
    }

    public function getStandard() {
        return Mage::getSingleton('moip/standard');
    }

    protected function _expireAjax() {
        if (!Mage::getSingleton('checkout/session')->getQuote()->hasItems()) {
            $this->getResponse()->setHeader('HTTP/1.1', '403 Session Expired');
            exit;
        }
    }

    /**
     * Executa as transações com MoIP de acordo com as informações passadas no frontend
     * @access public
     * @return void
     */
    public function redirectAction() {

        $session = Mage::getSingleton('checkout/session');
        $standard = $this->getStandard();


        $fields = $session->getMoIPFields();
        $fields['id_transacao'] = Mage::getSingleton('checkout/session')->getLastRealOrderId();
        $pgtoArray = $session->getPgtoArray();


        $api = Mage::getModel('moip/api');
        $api->setAmbiente($standard->getConfigData('ambiente'));
        $xml = $api->generateXML($fields, $pgtoArray);
        Mage::register('xml', $xml);



$formapgto = $api->generateforma($fields, $pgtoArray);
Mage::register('formapgto', $formapgto);


$formapg = $api->generateformapg($fields, $pgtoArray);
Mage::register('formapg', $formapg);



        $token = $api->getToken($xml);
        $session->setMoipStandardQuoteId($session->getQuoteId());
        Mage::register('token', $token['token']);
		Mage::register('erro', $token['erro']);
        Mage::register('StatusPgdireto', $token['pgdireto_status']);

        $this->loadLayout();
	$this->getLayout()->getBlock('root')->setTemplate('page/1column.phtml');
	$this->getLayout()->getBlock('content')->append($this->getLayout()->createBlock('moip/standard_redirect'));      
        $this->renderLayout();
        $session->unsQuoteId();

    }

    /**
     * Quando um cliente cancelar o pagamento da Moip
     */
    public function cancelAction() {
        $session = Mage::getSingleton('checkout/session');
        $session->setQuoteId($session->getMoipStandardQuoteId(true));

        if ($session->getLastRealOrderId()) {
            $order = Mage::getModel('sales/order')->loadByIncrementId($session->getLastRealOrderId());
            if ($order->getId()) {
                $order->cancel()->save();
            }
        }

        $this->_redirect('checkout/cart');
    }

    /**
     * Quando há retorno para o Módulo. A informação da ordem neste momento é em Variáveis via POST. No entanto, você não quer "processar" o pedido até o obter a validação do IPN
     */
    public function successAction() {
        $standard = $this->getStandard();
        $order = Mage::getModel('sales/order');
        $session = Mage::getSingleton('checkout/session');

        if (!$this->getRequest()->isPost()) {
            $session->setQuoteId($session->getMoipStandardQuoteId(true));

            /**
             * definir a citação como inativos após a volta do Módulo
             */
            Mage::getSingleton('checkout/session')->getQuote()->setIsActive(false)->save();

            /**
             * Enviar e-mail de confirmação para o cliente
             */
            $order->load(Mage::getSingleton('checkout/session')->getLastOrderId());
            if ($order->getId()) {
           
            }

            /**
             * Faz o redirecionamento para a tela de compra efetuada
             */
            $this->_redirect('checkout/onepage/success', array('_secure' => true));
        } else {

            $data = $this->getRequest()->getPost();

            /**
             * Efetua a mudança do Status
             */
            $order->loadByIncrementId(ereg_replace("[^0-9]", "", $data['id_transacao']));

            /*
              const STATE_NEW        = 'new';
              const STATE_PROCESSING = 'processing';
              const STATE_COMPLETE   = 'complete';
              const STATE_CLOSED     = 'closed';
              const STATE_CANCELED   = 'canceled';
              const STATE_HOLDED     = 'holded';
             */
 switch ($data['status_pagamento']) {
            case 1:
                $state = Mage_Sales_Model_Order::STATE_PROCESSING;
                $status = 'processing';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
				//Inicia geração da fatura
				$invoice = $order->prepareInvoice();							
if ($this->getStandard()->canCapture())
	{
		$invoice->register()->capture();
	}									
Mage::getModel('core/resource_transaction')
->addObject($invoice)
->addObject($invoice->getOrder())
->save();
$invoice->sendEmail();
$invoice->setEmailSent(true);
$invoice->save();
//encerra geração da fatura! salve o tricolor paulista!
                break;
            case 2:
                $state = Mage_Sales_Model_Order::STATE_HOLDED;
                $status = 'holded';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            case 3:
                $state = Mage_Sales_Model_Order::STATE_HOLDED;
                $status = 'holded';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            case 4:
                $state = Mage_Sales_Model_Order::STATE_PROCESSING;
                $status = 'processing';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            case 5:
                $state = Mage_Sales_Model_Order::STATE_CANCELED;
                $status = 'canceled';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            case 6:
                $state = Mage_Sales_Model_Order::STATE_HOLDED;
                $status = 'holded';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            case 7:
                $state = Mage_Sales_Model_Order::STATE_PROCESSING;
                $status = 'processing';
                $comment = $this->getStatusPagamentoMoip($data['status_pagamento']);
                break;
            }

            $order->setState($state, $status, $comment, $notified = true);
            $order->save();

            /**
             * Enviar e-mail de confirmação para o cliente
             */
            $order->load(Mage::getSingleton('checkout/session')->getLastOrderId());
            if ($order->getId()) {
                //$order->sendNewOrderEmail();
            }

            Zend_Debug::dump('Processo de retorno concluido!');
        }
    }

    /**
     * Retorna Status do Pagamento Moip
     * @param $param
     * @return string
     */
    private function getStatusPagamentoMoip($param) {

        $status = "";

        switch ($param) {
        case 1:
            $status = "Autorizado";
            break;
        case 2:
            $status = "Iniciado";
            break;
        case 3:
            $status = "Boleto Impresso";
            break;
        case 4:
            $status = "Concluido";
            break;
        case 5:
            $status = "Cancelado";
            break;
        case 6:
            $status = "Em análise";
            break;
        case 7:
            $status = "Estornado";
            break;
        }

        return $status;
    }

}