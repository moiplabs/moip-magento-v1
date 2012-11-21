$MW_Onestepcheckout(function(){
	if(zip_load()){
			var val_zipbill_before=$MW_Onestepcheckout('#billing\\:postcode').val();
			$MW_Onestepcheckout('#billing\\:postcode').blur(function(event){ //$MW_Onestepcheckout('#billing\\:postcode').live("blur", function(){//	$MW_Onestepcheckout('#billing\\:postcode').blur(function(event){
				val=this.value;
				if(val!="" && val_zipbill_before!=val){					
					if($MW_Onestepcheckout('#billing\\:country_id').val())						
						updateShippingType();
				}
				val_zipbill_before=val;
			});
	}
	
	
	if(region_load()){
	var val_regionbill_before=$MW_Onestepcheckout('#billing\\:region').val();
	$MW_Onestepcheckout('#billing\\:region').blur(function(event){ //$MW_Onestepcheckout('#billing\\:region').live("blur", function(event) { //{$MW_Onestepcheckout('#billing\\:region').blur(function(event){
		val=this.value;
		if(val!="" && val_regionbill_before!=val){					
			if($MW_Onestepcheckout('#billing\\:country_id').val())						
				updateShippingType();
		}
		val_regionbill_before=val;
	});	
	}
	
	if(city_load()){
		var val_citybill_before=$MW_Onestepcheckout('#billing\\:city').val();	
		//$MW_Onestepcheckout('#billing\\:city').live("blur", function(event){
		$MW_Onestepcheckout('#billing\\:city').blur(function(event){
			val=this.value;
			if(val!="" && val_citybill_before!=val){					
				if($MW_Onestepcheckout('#billing\\:country_id').val())						
					updateShippingType();
			}
			//alert(val_citybill_before);
			val_citybill_before=val;
		});
	}
});