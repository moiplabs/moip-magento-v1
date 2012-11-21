<?php
class MW_Onestepcheckout_Model_Observer
{
	public function model_config_data_save_before($ovserver)
	{
		$config_onecheckout = $_POST;
		$addfield = $config_onecheckout['groups']['addfield']['fields'];
		$config = $config_onecheckout['groups']['config']['fields'];
		
		
		if(intval($config['enabled']['value']==1))
		{
			
			// set default country
			if($config['default_country']['value'] != "")
			{	
				Mage::getModel('core/config')->saveConfig('general/country/default', $config['default_country']['value'] );
			}
			
			if ( intval($addfield['street_lines']['value'])>=1 && intval($addfield['street_lines']['value'])<=4)
			{
				Mage::getModel('core/config')->saveConfig('customer/address/street_lines',$addfield['street_lines']['value']);
			}
			else 
			{
				Mage::getModel('core/config')->saveConfig('customer/address/street_lines',2);
			}
			
			
			Mage::getModel('core/config')->saveConfig('customer/address/prefix_show',$addfield['prefix_show']['value']);			
			Mage::getModel('core/config')->saveConfig('customer/address/middlename_show',$addfield['middlename_show']['value']);
			Mage::getModel('core/config')->saveConfig('customer/address/suffix_show',$addfield['suffix_show']['value']);
			Mage::getModel('core/config')->saveConfig('customer/address/dob_show',$addfield['dob_show']['value']);
			Mage::getModel('core/config')->saveConfig('customer/address/taxvat_show',$addfield['taxvat_show']['value']);
			Mage::getModel('core/config')->saveConfig('customer/address/gender_show',$addfield['gender_show']['value']);
									
			// set option or required for zip post code, state provice.
			if (intval($config['is_sort_add']['value'])==1) // enable sort
			{
				
				//config to zip postal code
				if(intval($addfield['zip']['value']) == 1)
				{	
					$country_allow = Mage::getStoreConfig('general/country/allow');
					Mage::getModel('core/config')->saveConfig('general/country/optional_zip_countries',$country_allow);
				}
				if(intval($addfield['zip']['value']) == 2)
				{					
					Mage::getModel('core/config')->saveConfig('general/country/optional_zip_countries','');
				}
				// config state is option
				if(version_compare(Mage::getVersion(),'1.7.0.0','>=') && intval($addfield['state']['value'])==1)
				{
					//$inchooSwitch = new Mage_Core_Model_Config();
					Mage::getModel('core/config')->saveConfig('general/region/state_required','' );
					Mage::getModel('core/config')->saveConfig('general/region/display_all',1);
				}	
				
				// config state is required		
				if(version_compare(Mage::getVersion(),'1.7.0.0','>=') && intval($addfield['state']['value'])==2)
				{
					$country_allow = Mage::getStoreConfig('general/country/allow');
					Mage::getModel('core/config')->saveConfig('general/region/state_required',$country_allow );
					Mage::getModel('core/config')->saveConfig('general/region/display_all',1);
				}	
				
			}
			else 
			{
				$country_allow = Mage::getStoreConfig('general/country/allow');
				Mage::getModel('core/config')->saveConfig('general/country/optional_zip_countries',$country_allow);	
				if(version_compare(Mage::getVersion(),'1.7.0.0','>='))
				{
					Mage::getModel('core/config')->saveConfig('general/region/state_required','');
					Mage::getModel('core/config')->saveConfig('general/region/display_all',1);
				}
			}
			
			// update manage fields
			
		}
		else 
		{
			// required zip post code with every countries
			Mage::getModel('core/config')->saveConfig('general/country/optional_zip_countries','');
			if(version_compare(Mage::getVersion(),'1.7.0.0','>='))
				{
					Mage::getModel('core/config')->saveConfig('general/region/state_required','');
					Mage::getModel('core/config')->saveConfig('general/region/display_all',1);
				}
		}
		
	}
	public function checkout_cart_add_product_complete($ovserver)
	{
		if(Mage::getStoreConfig('onestepcheckout/config/disable_shop_cart'))
		{				
			Mage::app()->getResponse()->setRedirect(Mage::getUrl('checkout/onepage'));			
			Mage::app()->getResponse()->sendResponse(); // co the dung Mage::app()->getResponse()->sendHeaders();
			exit;
		}
	}
}
