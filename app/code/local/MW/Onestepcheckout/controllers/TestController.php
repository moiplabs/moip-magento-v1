<?php
class MW_Onestepcheckout_TestController extends Mage_Core_Controller_Front_Action
{
		public function indexAction()
		{
			 
			//echo Mage::getStoreConfig('onestepcheckout/addfield/allowsubscribenewsletter').'/';			
			//echo Mage::getConfig('onestepcheckout/config/allowremoveproduct').'dsfdsf';
			 echo Mage::getUrl('onestepcheckout/index/updatebillingform');
		}
}