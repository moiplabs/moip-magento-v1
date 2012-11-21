<?php 
class MW_Onestepcheckout_Model_System_Config_Source_Pagelayout
{
    public function toOptionArray()
    {
        return array(        	
             array('value'=>2, 'label'=>Mage::helper('onestepcheckout')->__('2 Columns')),
        	 array('value'=>3, 'label'=>Mage::helper('onestepcheckout')->__('3 Columns')),
            );
    }
    
}
