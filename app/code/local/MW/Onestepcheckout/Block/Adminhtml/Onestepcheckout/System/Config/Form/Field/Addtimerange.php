<?php
class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout_System_Config_Form_Field_Addtimerange extends Mage_Adminhtml_Block_System_Config_Form_Field_Regexceptions
{
    public function __construct()
    {
        $this->addColumn('starttime', array(
            'label' => Mage::helper('adminhtml')->__('Start Time '),
            'style' => 'width:120px',
        ));
        $this->addColumn('endtime', array(
            'label' => Mage::helper('adminhtml')->__('End Time'),
            'style' => 'width:120px',
        ));
        $this->_addAfter = false;
        $this->_addButtonLabel = Mage::helper('adminhtml')->__('Add Time Range');
        Mage_Adminhtml_Block_System_Config_Form_Field_Array_Abstract::__construct();
    }
}