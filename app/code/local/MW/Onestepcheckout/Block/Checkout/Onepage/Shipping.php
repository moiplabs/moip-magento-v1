<?php
class MW_Onestepcheckout_Block_Checkout_Onepage_Shipping extends Mage_Checkout_Block_Onepage_Shipping
{
    public function getAddressesHtmlSelect($type)
    {
	
        if ($this->isCustomerLoggedIn()) {
            $options = array();
            foreach ($this->getCustomer()->getAddresses() as $address) {
                $options[] = array(
                    'value'=>$address->getId(),
                    'label'=>$address->format('oneline')
                );
            }

            $addressId = $this->getAddress()->getId();
            if (empty($addressId)) {
                if ($type=='billing') {
                    $address = $this->getCustomer()->getPrimaryBillingAddress();
                } else {
                    $address = $this->getCustomer()->getPrimaryShippingAddress();
                }
                if ($address) {
                    $addressId = $address->getId();
                }
            }

            $select = $this->getLayout()->createBlock('core/html_select')
                ->setName($type.'_address_id')
                ->setId($type.'-address-select')
                ->setClass('address-select')
               //->setExtraParams('onchange="'.$type.'.newAddress(!this.value)"')
                ->setValue($addressId)
                ->setOptions($options);

            $select->addOption('', Mage::helper('checkout')->__('New Address'));

            return $select->getHtml();
        }
        return '';
    }
    
// 	public function getCountryHtmlSelect($type)
//    {
//        $countryId = $this->getAddress()->getCountryId();
//        
//        if (is_null($countryId)){
//			if(Mage::getStoreConfig('onestepcheckout/config/enable_geoip')){
//				$countryId=Mage::registry('Countrycode');
//			}
//			elseif (Mage::getStoreConfig('onestepcheckout/config/default_country')) {
//           		 $countryId = Mage::getStoreConfig('onestepcheckout/config/default_country');	// xuat ra voi' default country duoc cau hinh trong onestepcheckout           		 	
//			}
//			else {
//				$countryId = Mage::getStoreConfig('general/country/default');	// xuat ra voi' default country duoc cau hinh trong GENERAL DEFAULT CUA MAGENTO
//			}
//        }    
//        $select = $this->getLayout()->createBlock('core/html_select')
//            ->setName($type.'[country_id]')
//            ->setId($type.':country_id')
//            ->setTitle(Mage::helper('checkout')->__('Country'))
//            ->setClass('validate-select shipping_country')
//            ->setValue($countryId)
//            ->setOptions($this->getCountryOptions());
//        if ($type === 'shipping') {
//            $select->setExtraParams('onchange="shipping.setSameAsBilling(false);"');
//        }         
//        return $select->getHtml();
//       
//    } 

}