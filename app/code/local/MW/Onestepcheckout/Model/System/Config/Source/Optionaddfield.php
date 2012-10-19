<?php 
class MW_Onestepcheckout_Model_System_Config_Source_Optionaddfield 
{
    public function toOptionArray()
    {
        return array(
            array('value'=>0, 'label'=>Mage::helper('adminhtml')->__('Disable')),
            array('value'=>1, 'label'=>Mage::helper('adminhtml')->__('Optional')),
            array('value'=>2, 'label'=>Mage::helper('adminhtml')->__('Required')),
        );
    }

}