<?php 
class MW_Onestepcheckout_Model_System_Config_Source_Optionaddfield 
{


    const STATUS_OPTIONAL	= 1;
    const STATUS_REQUIRED	= 2;
    const STATUS_DISABLED	= 0;
    
    static public function toOptionArray()
    {
        return array(        	
            self::STATUS_OPTIONAL   	=> Mage::helper('onestepcheckout')->__('Optional'),
            self::STATUS_REQUIRED => Mage::helper('onestepcheckout')->__('Required'),
            self::STATUS_DISABLED  	=> Mage::helper('onestepcheckout')->__('Disable')
            
        );
    }
    
// public function toOptionArray()
//    {
//        return array(
//            array('value'=>0, 'label'=>Mage::helper('adminhtml')->__('Disable')),
//            array('value'=>1, 'label'=>Mage::helper('adminhtml')->__('Optional')),
//            array('value'=>2, 'label'=>Mage::helper('adminhtml')->__('Required')),
//        );
//    }
}