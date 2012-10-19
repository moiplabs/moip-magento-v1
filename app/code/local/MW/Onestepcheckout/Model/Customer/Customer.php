<?php
class MW_Onestepcheckout_Model_Customer_Customer extends Mage_Customer_Model_Customer 
{
    public function validate()
    {
        $errors = array();
        $customerHelper = Mage::helper('customer');
		if(!Mage::getStoreConfig('onestepcheckout/config/is_disable')){
			if(Mage::getStoreConfig('onestepcheckout/addfield/name')){
				if (!Zend_Validate::is( trim($this->getFirstname()) , 'NotEmpty')) {
					$errors[] = $customerHelper->__('The first name cannot be empty.');
				}
				if (!Zend_Validate::is( trim($this->getLastname()) , 'NotEmpty')) {
					$errors[] = $customerHelper->__('The last name cannot be empty.');
				}
			}
			if(Mage::getStoreConfig('onestepcheckout/addfield/email') ==2){
				if (!Zend_Validate::is($this->getEmail(), 'EmailAddress')) {
					$errors[] = $customerHelper->__('Invalid email address "%s".', $this->getEmail());
				}
			}
		}
		else{
			if (!Zend_Validate::is( trim($this->getFirstname()) , 'NotEmpty')) {
				$errors[] = $customerHelper->__('The first name cannot be empty.');
			}

			if (!Zend_Validate::is( trim($this->getLastname()) , 'NotEmpty')) {
				$errors[] = $customerHelper->__('The last name cannot be empty.');
			}

			if (!Zend_Validate::is($this->getEmail(), 'EmailAddress')) {
				$errors[] = $customerHelper->__('Invalid email address "%s".', $this->getEmail());
			}		
		}
			$password = $this->getPassword();
			if (!$this->getId() && !Zend_Validate::is($password , 'NotEmpty')) {
				$errors[] = $customerHelper->__('The password cannot be empty.');
			}
			if (strlen($password) && !Zend_Validate::is($password, 'StringLength', array(6))) {
				$errors[] = $customerHelper->__('The minimum password length is %s', 6);
			}
			$confirmation = $this->getConfirmation();
			if ($password != $confirmation) {
				$errors[] = $customerHelper->__('Please make sure your passwords match.');
			}

			$entityType = Mage::getSingleton('eav/config')->getEntityType('customer');
			$attribute = Mage::getModel('customer/attribute')->loadByCode($entityType, 'dob');
			if ($attribute->getIsRequired() && '' == trim($this->getDob())) {
				$errors[] = $customerHelper->__('The Date of Birth is required.');
			}
			$attribute = Mage::getModel('customer/attribute')->loadByCode($entityType, 'taxvat');
			if ($attribute->getIsRequired() && '' == trim($this->getTaxvat())) {
				$errors[] = $customerHelper->__('The TAX/VAT number is required.');
			}
			$attribute = Mage::getModel('customer/attribute')->loadByCode($entityType, 'gender');
			if ($attribute->getIsRequired() && '' == trim($this->getGender())) {
				$errors[] = $customerHelper->__('Gender is required.');
			}

			if (empty($errors)) {
				return true;
			}
			return $errors;
		
    }
}