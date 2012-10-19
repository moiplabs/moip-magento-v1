<?php

class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                 
        $this->_objectId = 'id';
        $this->_blockGroup = 'onestepcheckout';
        $this->_controller = 'adminhtml_onestepcheckout';
        
        $this->_updateButton('save', 'label', Mage::helper('onestepcheckout')->__('Save Item'));
        $this->_updateButton('delete', 'label', Mage::helper('onestepcheckout')->__('Delete Item'));
		
        $this->_addButton('saveandcontinue', array(
            'label'     => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick'   => 'saveAndContinueEdit()',
            'class'     => 'save',
        ), -100);

        $this->_formScripts[] = "
            function toggleEditor() {
                if (tinyMCE.getInstanceById('onestepcheckout_content') == null) {
                    tinyMCE.execCommand('mceAddControl', false, 'onestepcheckout_content');
                } else {
                    tinyMCE.execCommand('mceRemoveControl', false, 'onestepcheckout_content');
                }
            }

            function saveAndContinueEdit(){
                editForm.submit($('edit_form').action+'back/edit/');
            }
        ";
    }

    public function getHeaderText()
    {
        if( Mage::registry('onestepcheckout_data') && Mage::registry('onestepcheckout_data')->getId() ) {
            return Mage::helper('onestepcheckout')->__("Edit Item '%s'", $this->htmlEscape(Mage::registry('onestepcheckout_data')->getTitle()));
        } else {
            return Mage::helper('onestepcheckout')->__('Add Item');
        }
    }
}