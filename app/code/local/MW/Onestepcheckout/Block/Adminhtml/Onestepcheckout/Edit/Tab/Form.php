<?php

class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('onestepcheckout_form', array('legend'=>Mage::helper('onestepcheckout')->__('Item information')));
     
      $fieldset->addField('title', 'text', array(
          'label'     => Mage::helper('onestepcheckout')->__('Title'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'title',
      ));

      $fieldset->addField('filename', 'file', array(
          'label'     => Mage::helper('onestepcheckout')->__('File'),
          'required'  => false,
          'name'      => 'filename',
	  ));
		
      $fieldset->addField('status', 'select', array(
          'label'     => Mage::helper('onestepcheckout')->__('Status'),
          'name'      => 'status',
          'values'    => array(
              array(
                  'value'     => 1,
                  'label'     => Mage::helper('onestepcheckout')->__('Enabled'),
              ),

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('onestepcheckout')->__('Disabled'),
              ),
          ),
      ));
     
      $fieldset->addField('content', 'editor', array(
          'name'      => 'content',
          'label'     => Mage::helper('onestepcheckout')->__('Content'),
          'title'     => Mage::helper('onestepcheckout')->__('Content'),
          'style'     => 'width:700px; height:500px;',
          'wysiwyg'   => false,
          'required'  => true,
      ));
     
      if ( Mage::getSingleton('adminhtml/session')->getOnestepcheckoutData() )
      {
          $form->setValues(Mage::getSingleton('adminhtml/session')->getOnestepcheckoutData());
          Mage::getSingleton('adminhtml/session')->setOnestepcheckoutData(null);
      } elseif ( Mage::registry('onestepcheckout_data') ) {
          $form->setValues(Mage::registry('onestepcheckout_data')->getData());
      }
      return parent::_prepareForm();
  }
}