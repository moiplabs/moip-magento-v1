<?php
// config option value to zip/post code and state after install this module 
	try {
		$countryList = Mage::getResourceModel('directory/country_collection')
		                    ->loadData()
		                    ->toOptionArray(FALSE);
		 foreach($countryList as $country)
		 {
		 	$country_allow .= $country['value'].',';
		 }
	 	$country_allow = substr($country_allow, 0, strlen($country_allow)-1);   
	 	Mage::getModel('core/config')->saveConfig('general/country/optional_zip_countries',$country_allow);                   
		
	 	if(version_compare(Mage::getVersion(),'1.7.0.0','>='))
			{
				Mage::getModel('core/config')->saveConfig('general/region/state_required','');
				Mage::getModel('core/config')->saveConfig('general/region/display_all',1);
			}
	}
	catch (Exception $e)
	{
		Mage::logException($e);
	}
?>