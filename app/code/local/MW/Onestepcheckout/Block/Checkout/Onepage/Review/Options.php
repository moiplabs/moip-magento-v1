<?php
class MW_Onestepcheckout_Block_Checkout_Onepage_Review_Options extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
     public function getModuletest()     
     { 
        if (!$this->hasData('onestepcheckout')) {
            $this->setData('onestepcheckout', Mage::registry('onestepcheckout'));
        }
        return $this->getData('onestepcheckout');
        
    }
}