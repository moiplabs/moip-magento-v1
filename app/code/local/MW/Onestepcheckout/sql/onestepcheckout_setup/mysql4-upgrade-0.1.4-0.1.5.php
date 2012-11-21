<?php

$installer = $this;

$installer->startSetup();
$collection =Mage::getResourceModel('eav/entity_attribute_collection');
$installer->run("

	UPDATE {$collection->getTable('attribute')}
		SET is_required =1
		WHERE (entity_type_id =1 OR entity_type_id =2) 
			AND (
			attribute_code ='postcode' 
			)
    ");
//
$installer->endSetup(); 