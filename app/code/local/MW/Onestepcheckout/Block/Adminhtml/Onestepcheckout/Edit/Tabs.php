<?php

class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('onestepcheckout_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('onestepcheckout')->__('Item Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('onestepcheckout')->__('Item Information'),
          'title'     => Mage::helper('onestepcheckout')->__('Item Information'),
          'content'   => $this->getLayout()->createBlock('onestepcheckout/adminhtml_onestepcheckout_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}