<?php
class MW_Onestepcheckout_Block_Adminhtml_Onestepcheckout_Sales_Order_Grid extends Mage_Adminhtml_Block_Sales_Order_Grid
{
// protected function _prepareLayout()
    // {
        // $this->addTab('label', array(
                // 'label'     => Mage::helper('catalog')->__('Product Label'),
                // 'content'   => $this->getLayout()->createBlock('smartlabel/adminhtml_catalog_product_edit_tab_label')->toHtml(),
            // ));
            // return parent::_prepareLayout();
    // }
    protected function _prepareCollection()
    {
	$collect= Mage::getModel('customer/customer')->getCollection();	
	if(version_compare(Mage::getVersion(),'1.4.1.0','>=')){
        $collection = Mage::getResourceModel('sales/order_grid_collection');
        $collection->getSelect()->joinleft(array('one_step'=>$collect->getTable('mw_onestepcheckout')),'one_step.sales_order_id=main_table.entity_id',array('mw_deliverydate_date','mw_customercomment_info','mw_deliverydate_time'));		
        $this->setCollection($collection);
		}
	else{
	        //TODO: add full name logic
	        $collection = Mage::getResourceModel('sales/order_collection')
	            ->addAttributeToSelect('*')
	            ->joinAttribute('billing_firstname', 'order_address/firstname', 'billing_address_id', null, 'left')
	            ->joinAttribute('billing_lastname', 'order_address/lastname', 'billing_address_id', null, 'left')
	            ->joinAttribute('shipping_firstname', 'order_address/firstname', 'shipping_address_id', null, 'left')
	            ->joinAttribute('shipping_lastname', 'order_address/lastname', 'shipping_address_id', null, 'left')
	            ->addExpressionAttributeToSelect('billing_name',
	                'CONCAT({{billing_firstname}}, " ", {{billing_lastname}})',
	                array('billing_firstname', 'billing_lastname'))
	            ->addExpressionAttributeToSelect('shipping_name',
	                'CONCAT({{shipping_firstname}}, " ", {{shipping_lastname}})',
	                array('shipping_firstname', 'shipping_lastname'));			
			$collection->getSelect()->joinleft(			//array(	'one_step'=>'mw_onestepcheckout'),
														array('one_step'=>$collect->getTable('mw_onestepcheckout')),
														'one_step.sales_order_id=e.entity_id',
														array('mw_deliverydate_date','mw_customercomment_info','mw_deliverydate_time')
												);			
	        $this->setCollection($collection);
			}
		return Mage_Adminhtml_Block_Widget_Grid::_prepareCollection();	//goi _prepareCollection(); cua cap ong cho phep sort giam dan ->dung muc dich
    }
	
	
protected function _prepareColumns()
		{
        $this->addColumn('real_order_id', array(
            'header'=> Mage::helper('sales')->__('Order #'),

            'type'  => 'text',
            'index' => 'increment_id',
        ));

        if (!Mage::app()->isSingleStoreMode()) {
            $this->addColumn('store_id', array(
                'header'    => Mage::helper('sales')->__('Store'),
				'width'		=>'100px',
                'index'     => 'store_id',
                'type'      => 'store',
                'store_view'=> true,
                'display_deleted' => true,

            ));
        }

        $this->addColumn('created_at', array(
            'header' => Mage::helper('sales')->__('Purchased On'),
            'index' => 'created_at',
            'type' => 'datetime',

        ));

        /*$this->addColumn('billing_firstname', array(
            'header' => Mage::helper('sales')->__('Bill to First name'),
            'index' => 'billing_firstname',
        ));

        $this->addColumn('billing_lastname', array(
            'header' => Mage::helper('sales')->__('Bill to Last name'),
            'index' => 'billing_lastname',
        ));*/
        $this->addColumn('billing_name', array(
            'header' => Mage::helper('sales')->__('Bill to Name'),
            'index' => 'billing_name',

        ));

        /*$this->addColumn('shipping_firstname', array(
            'header' => Mage::helper('sales')->__('Ship to First name'),
            'index' => 'shipping_firstname',
        ));

        $this->addColumn('shipping_lastname', array(
            'header' => Mage::helper('sales')->__('Ship to Last name'),
            'index' => 'shipping_lastname',
        ));*/
        $this->addColumn('shipping_name', array(
            'header' => Mage::helper('sales')->__('Ship to Name'),
            'index' => 'shipping_name',

        ));
		
		$this->addColumn('mw_customercomment_info', array(
			'header' => Mage::helper('sales')->__('Customer Comment'),
			'index' => 'mw_customercomment_info',
			'type'  => 'text',

		));
		if(Mage::getStoreConfig('onestepcheckout/deliverydate/allow_options')){
			$this->addColumn('mw_deliverydate_date', array(
				'header' => Mage::helper('sales')->__('Delivery Date'),
				'index' => 'mw_deliverydate_date',
				'type'  => 'text',

			));
			$this->addColumn('mw_deliverydate_time', array(
				'header' => Mage::helper('sales')->__('Delivery Time'),
				'index' => 'mw_deliverydate_time',
				'type'  => 'text',

			));
		}
        $this->addColumn('base_grand_total', array(
            'header' => Mage::helper('sales')->__('G.T. (Base)'),
            'index' => 'base_grand_total',
            'type'  => 'currency',
            'currency' => 'base_currency_code',
        ));

        $this->addColumn('grand_total', array(
            'header' => Mage::helper('sales')->__('G.T. (Purchased)'),
            'index' => 'grand_total',
            'type'  => 'currency',
            'currency' => 'order_currency_code',
        ));

        $this->addColumn('status', array(
            'header' => Mage::helper('sales')->__('Status'),
            'index' => 'status',
            'type'  => 'options',

            'options' => Mage::getSingleton('sales/order_config')->getStatuses(),
        ));

        if (Mage::getSingleton('admin/session')->isAllowed('sales/order/actions/view')) {
            $this->addColumn('action',
                array(
                    'header'    => Mage::helper('sales')->__('Action'),
                    'width'     => '50px',
                    'type'      => 'action',
                    'getter'     => 'getId',
                    'actions'   => array(
                        array(
                            'caption' => Mage::helper('sales')->__('View'),
                            'url'     => array('base'=>'*/*/view'),
                            'field'   => 'order_id'
                        )
                    ),
                    'filter'    => false,
                    'sortable'  => false,
                    'index'     => 'stores',
                    'is_system' => true,
            ));
        }
        $this->addRssList('rss/order/new', Mage::helper('sales')->__('New Order RSS'));

        //return parent::_prepareColumns();
	}
    protected function _addColumnFilterToCollection($column)
    {
        if ($this->getCollection()) {
            $field = ( $column->getFilterIndex() ) ? $column->getFilterIndex() : $column->getIndex();
            if ($column->getFilterConditionCallback()) {
                call_user_func($column->getFilterConditionCallback(), $this->getCollection(), $column);
            } else {
                $cond = $column->getFilter()->getCondition();
                if ($field && isset($cond)) {
                   // $this->getCollection()->addFieldToFilter($field , $cond);
					if($field=='mw_customercomment_info' OR $field=='mw_deliverydate_date' OR $field=='mw_deliverydate_time'){
						foreach($cond as $typecond => $value){
							if(version_compare(Mage::getVersion(),'1.4.1.0','>=')){
									$this->getCollection()->getSelect()->where('one_step.'.$field.' '.$typecond.' "'.$value.'"');
							}else{			
									$this->getCollection()->getSelect()->where($field.' '.$typecond.' "'.$value.'"');
							}
						}
					}
					else{
							if(version_compare(Mage::getVersion(),'1.4.1.0','>=')){
								$this->getCollection()->addFieldToFilter("main_table.".$field , $cond);
							}else{
								$this->getCollection()->addFieldToFilter($field , $cond);
							}
						}
					}				   
            }
        }
     
        return $this;
    }
}
