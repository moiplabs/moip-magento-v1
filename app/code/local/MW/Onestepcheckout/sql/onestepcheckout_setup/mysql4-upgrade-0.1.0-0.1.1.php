<?php
	$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
	$setup->addAttribute('order', 'mw_customercomment', array(
	'label' => 'Customer Comment',
	'type' => 'text',
	'input' => 'text',
	'visible' => true,
	'required' => false,
	'position' => 1,
	));