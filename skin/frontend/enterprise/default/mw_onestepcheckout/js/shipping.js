/**
 * 
 */
$MW_Onestepcheckout(function(){

	if(zip_load()){	
				var val_zipship_before=$MW_Onestepcheckout('#shipping\\:postcode').val();
				$MW_Onestepcheckout('#shipping\\:postcode').blur(function(event){
					val=this.value;
					if(val!="" && val_zipship_before!=val){					
						if($MW_Onestepcheckout('#shipping\\:country_id').val())						
							updateShippingType();
					}
					val_zipship_before=val;
				});
			}
	
	if(region_load()){
		var val_regionship_before=$MW_Onestepcheckout('#shipping\\:region').val();
		$MW_Onestepcheckout('#shipping\\:region').blur(function(event){
			val=this.value;
			if(val!="" && val_regionship_before!=val){					
				if($MW_Onestepcheckout('#shipping\\:country_id').val())						
					updateShippingType();
			}
			val_regionship_before=val;
		});
	}
	
	if(city_load()){
		var val_cityship_before=$MW_Onestepcheckout('#shipping\\:city').val();
		$MW_Onestepcheckout('#shipping\\:city').blur(function(event){
			val=this.value;
			if(val!="" && val_cityship_before!=val){					
				if($MW_Onestepcheckout('#shipping\\:country_id').val())						
					updateShippingType();
			}
			val_cityship_before=val;
		});	
	}
	
	

});