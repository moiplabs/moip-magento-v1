<?php
class MW_Onestepcheckout_Model_System_Config_Source_Form_Createfield extends Mage_Adminhtml_Block_System_Config_Form_Field
{

    protected function _getElementHtml(Varien_Data_Form_Element_Abstract $element)
    {
        $_options = array(
            'kaka' => Mage::helper('adminhtml')->__('kaak'),
            'cici' => Mage::helper('adminhtml')->__('cici'),
        );
        $_options2 = array(
            'pad' => Mage::helper('adminhtml')->__('require'),
            'tps' => Mage::helper('adminhtml')->__('norequire'),
        );
		$element1=$element;		
		$element2=$element;
        $element1->setValues($_options1)
            ->setStyle('width:70px;')
            ->setName($element1->getName() . '[]');
		$element2->setValues($_options2)
			->setStyle('width:170px;')
			->setName($element2->getName() . '[]');
		
		var_dump($element->getValue());die();
        $_parts = array();
		$_parts[0] = $element1->setValue(null)->getElementHtml();
		
		$element2=$element;
		$element2->setValues($_options2)
		->setStyle('width:170px;')
		->setName($element2->getName() . '[]');
		
		$_parts[1] = $element2->setValue(null)->getElementHtml();
		$_parts[] = $element->setValue(null)->getElementHtml();
        return implode(' / ', $_parts);
    }

}