<?php
class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_onestepcheckout';
    $this->_blockGroup = 'onestepcheckout';
    $this->_headerText = Mage::helper('onestepcheckout')->__('Item Manager');
    $this->_addButtonLabel = Mage::helper('onestepcheckout')->__('Add Item');
    parent::__construct();
  }
}