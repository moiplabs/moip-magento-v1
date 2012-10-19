<?php
class MW_Onestepcheckout_Block_Checkout_Top extends Mage_Core_Block_Template
{
	public function getAdditionaldays(){
		$array=array();
		//$week=explode(",",Mage::getStoreConfig('onestepcheckout/deliverydate/weekend'));
		$week=Mage::getStoreConfig('onestepcheckout/deliverydate/weekend');
		$listDay=explode(",", Mage::getStoreConfig("onestepcheckout/deliverydate/enableday"));
		if(!$listDay[0])
			return '';
		foreach($listDay as $item){
			$t=explode("/",$item);
    		$numday=date("w", mktime(0, 0, 0, $t[0], $t[1], $t[2]));// mktime(hour,minute,second,month,day,year) , w return number that day
    		if(strstr($week,$numday)){
				$array[]=$item;
			}
		}
		return implode(",",$array);
    }
    public function getNationaldays(){
    	$array=array();
		$week=Mage::getStoreConfig('onestepcheckout/deliverydate/weekend');
		$listDay=explode(",", Mage::getStoreConfig("onestepcheckout/deliverydate/disableday"));
		if(!$listDay[0])
			return '';
		foreach($listDay as $item){
			$t=explode("/",$item);
    		$numday=date("w", mktime(0, 0, 0, $t[0], $t[1], $t[2]));// mktime(hour,minute,second,month,day,year) , w return number that day
    		if(!strstr($week,$numday)){
				$array[]=$item;
			}
		}
		return implode(",",$array);
    }
}