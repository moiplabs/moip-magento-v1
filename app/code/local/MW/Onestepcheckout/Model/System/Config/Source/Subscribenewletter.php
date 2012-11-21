<?php
class MW_Onestepcheckout_Model_System_Config_Source_Subscribenewletter
{


    const STATUS_ENABLE_CHECKED	= 2;
    const STATUS_ENABLE_UNCHECKED	= 1;
    const STATUS_DISABLE	= 0;
    
    static public function toOptionArray()
    {
        return array(        	
            self::STATUS_ENABLE_CHECKED   	=> Mage::helper('onestepcheckout')->__('Enable & Checked'),
            self::STATUS_ENABLE_UNCHECKED => Mage::helper('onestepcheckout')->__('Enable & UnChecked'),
            self::STATUS_DISABLE  	=> Mage::helper('onestepcheckout')->__('Disable')
            
        );
    }

}