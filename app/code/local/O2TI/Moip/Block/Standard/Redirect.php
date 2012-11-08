<?php
class O2TI_Moip_Block_Standard_Redirect extends Mage_Core_Block_Abstract {
    protected function _toHtml() {
        $standard = Mage::getModel('moip/standard');
        $form = new Varien_Data_Form();
        $api = Mage::getModel('moip/api');
        $api->setAmbiente($standard->getConfigData('ambiente'));
        $url = $api->generateUrl(Mage::registry('token'));
		$meio = $api->generatemeip(Mage::registry('formapgto'));
		$opcaopg = $api->generatemeiopago(Mage::registry('formapg'));
        $status_pgdireto = Mage::registry('StatusPgdireto');
        $html = $this->__('');
        if (Mage::registry('token')) {
        if (!$status_pgdireto) {
			$incrementId = Mage::getSingleton('checkout/session')->getLastOrderId();
			$order = Mage::getModel('sales/order')->load($incrementId);
			$session = Mage::getSingleton('customer/session');
			$customer = $session->getCustomer();
			try{
				$order->sendNewOrderEmail();
			} catch (Exception $ex) {  };
			$shippingId = $order->getShippingAddress()->getId();
			$address = Mage::getModel('sales/order_address')->load($shippingId);
       ?>
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-xxxxxxxx-1']);
	_gaq.push(['_setDomainName', 'seusite.com.br']);
	_gaq.push(['_addIgnoreRef', 'seusite.com.br']);
	_gaq.push(['_trackPageview']);
	_gaq.push(['_addTrans',
		'<?php echo $order->getId() ?>',           // order ID - required
		'<?php echo Mage::app()->getStore() ?>',  // affiliation or store name
		'<?php echo ($order->getGrandTotal() - $order->getShippingAmount()) ?>',          // total - required
		'0',           // tax
		'<?php echo $order->getShippingAmount() ?>',              // shipping
		'<?php echo $address->getCity() ?>',       // city
		'<?php echo $address->getRegion() ?>',     // state or province
		'<?php echo $address->getCountry_id() ?>'// country
	]);
	// add item might be called for every item in the shopping cart
	// where your ecommerce engine loops through each item in the cart and
	// prints out _addItem for each
	<?php $orderItems = $order -> getItemsCollection();
	foreach ($orderItems as $item) {

		$product_sku = $item -> sku;
		$product_name = $item -> getName();
		$_product = Mage::getModel('catalog/product') -> load($item->getProductId());
		$cats = $_product -> getCategoryIds();
		$category_name = Mage::getModel('catalog/category') -> load($cats[0]) -> getName();
		$price = $item->getPrice();
		$qty = $item -> getQtyOrdered();
		echo "
		_gaq.push(['_addItem',
		'$incrementId',           // order ID - required
		'$product_sku',           // SKU/code - required
		'$product_name',        // product name
		'$category_name',   // category or variation
		'$price',          // unit price - required
		'$qty'               // quantity - required
		]);
		";
	}
	?>
	_gaq.push(['_trackTrans']);
	//submits transaction to the Analytics servers

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
<script type="text/javascript" src="<?php echo $this->getSkinUrl('o2ti_moip/js/jquery.js'); ?>"></script>
<script type='text/javascript' charset="ISO-8859-1" src='https://www.moip.com.br/transparente/MoipWidget-v2.js'></script>
<script type="text/javascript">
$(document).ready(function(){

	$("#resultado").hide();
	$("#token").val("<?php echo $url; ?>");
	$("#boleto").ready(function(){
		sendTomoip();
	});
});
sendTomoip = function() {
	var settings = {
		<?php echo $meio; ?>
	};
	MoipWidget(settings);
};
var sucesso = function(data){
	meio = data.TaxaMoIP;
	if (meio == undefined){
			$(".loader").css({display:"none"});
			$("#pgboletoedeb").removeAttr('disabled');
			<?php if($opcaopg == "BoletoBancario"){ ?>
				window.open("https://www.moip.com.br/Instrucao.do?token=<?php echo $url ?>");
			<?php } ?>
		}else{
			$("#pgcartao").removeAttr('disabled');
		if (data.Status == "Cancelado"){
			$(".loader").css({display:"none"});
			$("#statusmoip").append("<h3>Pagamento Cancelado</h3>");
			$("#statusmoipadd").append("Transação não aprovada.");
			$("#idmoip").append("O número de sua transação no Moip é: ");
			$("#idmoip").append(data.CodigoMoIP);
			$("#moiperro").append("<h4>Motivo:</h4>");
			var motivo = JSON.stringify(data.Classificacao.Descricao);
			if(motivo == '"Desconhecido"'){
				$("#moiperro").append("Seus dados estão incorretos ou não podemos envia-los a operadora de crédito.");
			}
			if(motivo == '"Transação não processada"'){
				$("#moiperro").append("O pagamento não pode ser processado.</br>Por favor, tente novamente.</br>Caso o erro persista, entre em contato com o nosso atendimento.");
			}
			if(motivo == '"Política de segurança do Moip"'){
				$("#moiperro").append("Pagamento não autorizado.</br>Entre em contato com o seu banco antes de uma nova tentativa.");
			}
			if(motivo == '"Política de segurança do Banco Emissor"'){
				$("#moiperro").append("O pagamento não foi autorizado pelo Banco Emissor do seu Cartão.</br>Entre em contato com o Banco para entender o motivo e refazer o pagamento..");
			}
			if(motivo == '"Cartão vencido"'){
				$("#moiperro").append("A validade do seu Cartão expirou.</br>Escolha outra forma de pagamento para concluir o pagamento.");
			}
			if(motivo == '"Dados inválidos"'){
				$("#moiperro").append("Dados informados inválidos.</br>Você digitou algo errado durante o preenchimento dos dados do seu Cartão.</br>Certifique-se de que está usando o Cartão correto e faça uma nova tentativa.");
			}
		}
		if (data.Status == "EmAnalise"){
			$(".loader").css({display:"none"});
			$("#statusmoip").append("<h3>Pagamento Aguardando Aprovação</h3>");
			$("#statusmoipadd").append("Por favor, aguarde a em analise da transação. Assim que for alterado o status você será informado via e-mail.");
			$("#idmoip").append("O número de sua transação no Moip é: ");
			$("#idmoip").append(data.CodigoMoIP);
		}
		if (data.Status == "Autorizado"){
			$(".loader").css({display:"none"});
			$("#statusmoip").append("<h3>Pagamento Aprovado</h3>");
			$("#statusmoipadd").append("Por favor, aguarde o processo de envio.");
			$("#idmoip").append("O número de sua transação no Moip é: ");
			$("#idmoip").append(data.CodigoMoIP);
		}
	}
};

var erroValidacao = function(data) {
	for (i=0; i<data.length; i++) {
		Moip = data[i];
		infosMoip = 'Ops, parece que há algo errado:';
		for(j in Moip){
			atributo = j;
			if(atributo == "Mensagem"){
				valor = Moip[j];
				infosMoip += '<li class="erro" style="list-style: none;margin-left: 29px;font-weight: bold;">'+valor +'</li>';
			}
		}
		$("#Errocartao").append(infosMoip);
		infosMoip = '';
	}
};
</script>
<script type="text/javascript" src="<?php echo $this->getSkinUrl('o2ti_moip/js/bootstrap.min.js'); ?>"></script>
<div id="MoipWidget" data-token="<? echo $url ?>" callback-method-error="erroValidacao" callback-method-success="sucesso"  ></div>

<h2>Transação realizada via Moip S/A</h2>
<a href="https://www.moip.com.br" target="_blank"><img src="<?php echo $this->getSkinUrl('o2ti_moip/imagem/logomoip.png'); ?>" border="0" style="float: right;"></a>
<div class="loader"/>Por favor, aguarde!</br><img src="<?php echo $this->getSkinUrl('o2ti_moip/imagem/ajax-loader.gif'); ?>" border="0"></div>
<div id="Errocartao"></div>
<?php if($opcaopg == "DebitoBancario"){?>
Seu pedido está quase concluído, por favor clique no link abaixo para ser redirecionado ao seu banco.</br></br>
<div id="pgboletoedeb" disabled="true" ><a href="https://www.moip.com.br/Instrucao.do?token=<? echo $url ?>"><button type="button" title="Ir ao Banco" class="button btn-checkout"><span style="_position:fixed;"><span style="_position:fixed;">Ir ao Banco</span></span></button></a></div>
<?php } ?>



<?php if($opcaopg == "BoletoBancario"){?>
</br>Clique no link abaixo para imprimir o seu boleto e concluir seu pedido.</br></br>
<div id="pgboletoedeb" disabled="true" ><a href="https://www.moip.com.br/Instrucao.do?token=<? echo $url ?>" target="_blank"><button type="button" title="Imprimir Boleto" class="button btn-checkout"><span style="_position:fixed;"><span style="_position:fixed;">Imprimir Boleto</span></span></button></a></div>
<?php } ?>




<?php if($opcaopg == "CartaoCredito"){?>
</br></br>
<div  id="pgcartao" disabled="true">
<div id="statusmoip"></div>
<div id="statusmoipadd"></div>
<div id="moiperro"></div>
<div id="idmoip"></div>
</div>
<?php } ?>

   <?php
            ob_flush();
            } else {

                if ($status_pgdireto <> "Cancelado")
                    $html.= "<meta http-equiv='Refresh' content='4;URL=/index.php/checkout/onepage/success/'>";

                if ($status_pgdireto == "Cancelado")
                    $html.= "O pagamento foi cancelado, você poderá realizar uma nova tentativa de compra utilizando outra forma de pagamento ou outro cartão.";
                elseif ($status_pgdireto == "Iniciado")
                    $html.= "A transação ainda está sendo processada e não foi confirmada até o momento. Você será informado por email assim que o processamento for concluído.";
                elseif ($status_pgdireto == "Sucesso")
                    $html.= "O pagamento foi concluído com sucesso e a loja será notificada notificado";
                else
                    $html.= "O pagamento foi autorizado, porém não foi confirmado por nossa equipe. Aguarde. Você receberá a confirmação do pagamento por e-mail.   ";

                //$html.= $status_pgdireto;
            }
        } else {
			 $html = "Erro durante o processamento. Tente novamente a operação.<br><br>
					<b>Erro encontrado</b>: ".Mage::registry('erro');
        }

        return $html;
    }

}