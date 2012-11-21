<?php

$installer = $this;

$installer->startSetup();
$collection =Mage::getResourceModel('eav/entity_attribute_collection');
$installer->run("

	UPDATE {$collection->getTable('attribute')}
		SET is_required =0
		WHERE (entity_type_id =1 OR entity_type_id =2) 
			AND (
			attribute_code ='firstname' or 
			attribute_code ='lastname' or 
			attribute_code ='email'	or 
			attribute_code ='country_id'  or 
			attribute_code ='city' or 
			attribute_code ='street' or 
			attribute_code ='telephone' or 
			attribute_code ='region_id' or 
			attribute_code ='region' or 
			attribute_code ='postcode' or 
			attribute_code ='fax' or 
			attribute_code ='company'
			)
    ");

$installer->endSetup(); 