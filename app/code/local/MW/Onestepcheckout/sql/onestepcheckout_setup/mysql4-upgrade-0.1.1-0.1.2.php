<?php

$installer = $this;

$installer->startSetup();

$installer->run("

DROP TABLE IF EXISTS {$this->getTable('mw_onestepcheckout')};
CREATE TABLE {$this->getTable('mw_onestepcheckout')} (
  `mw_onestepcheckout_date_id` int(11) unsigned NOT NULL auto_increment,
  `sales_order_id` int(11) unsigned NOT NULL,
  `mw_customercomment_info` varchar(255) default '',
  `mw_deliverydate_date` varchar(15) default '',
  `mw_deliverydate_time` varchar(10) default '',
  `status` smallint(6) default '0',
  `created_time` datetime NULL,
  `update_time` datetime NULL,
  PRIMARY KEY (`mw_onestepcheckout_date_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    ");

$installer->endSetup(); 