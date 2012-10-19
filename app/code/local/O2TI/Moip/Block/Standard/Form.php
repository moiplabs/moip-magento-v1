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

class O2TI_Moip_Block_Standard_Form extends Mage_Payment_Block_Form {

    protected function _construct() {
        $this->setTemplate('moip/form.phtml');
        parent::_construct();
    }

  
}