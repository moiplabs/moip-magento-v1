function timeoutProcess()
	{	
		val=$MW_Onestepcheckout("#shipping-address-select").val();
		if(val)	
		updateShippingType(add('shipping')); // line 101 in skin.../mw_onestepcheckout/js.js 
	}

 function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
 } 
 
 typeof(id3) == "undefined"
	 
 function add(str){
	var str_val="";
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"-address-select option:selected").val())=='undefined')?'':$MW_Onestepcheckout("#"+str+"-address-select option:selected").val())+",";
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"\\:country_id").val())=='undefined')?'':$MW_Onestepcheckout("#"+str+"\\:country_id").val())+",";
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"\\:postcode").val())=='undefined')?'':$MW_Onestepcheckout("#"+str+"\\:postcode").val())+",";
	if($MW_Onestepcheckout("#"+str+"\\:region_id").attr('display')=='block')
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"\\:region_id").val())=='undefined' && $MW_Onestepcheckout("#"+str+"\\:region_id").val()==null)?"":$MW_Onestepcheckout("#"+str+"\\:region_id").val())+",";
	else
	str_val=str_val+',';
	if($MW_Onestepcheckout("#"+str+"\\:region").attr('display')=='block')
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"\\:region").val())=='undefined' && $MW_Onestepcheckout("#"+str+"\\:region").val()==null)?"":$MW_Onestepcheckout("#"+str+"\\:region").val())+",";
	else
	str_val=str_val+',';
	str_val=str_val+((typeof($MW_Onestepcheckout("#"+str+"\\:city").val())=='undefined')?'':$MW_Onestepcheckout("#"+str+"\\:city").val());
	
	return str_val;
 }
 
$MW_Onestepcheckout(function(){
		
		var flag=1;	//kiem tra checkbox shiptosameaddress co duoc check hay uncheck, =1 la duoc check va default = checked
		var i=1;		

		//////////CONFIGURATION
		var shipaddselect=$MW_Onestepcheckout("#shipping-address-select");// line 104 co the bi empty
		
		////////
		var change=0;		//cho biet tag select -coutryid cua billing va shipping co bi change hay ko,=1 la bi change
		var change_select=0; //cho biet tag select #billing-address-select(khi acc login va` co address) co bi change hay ko
		var timer;
		var islogin = logined();	//cho biet customer login hay chua
		var hasadd = hasaddress();	//cho biet customer co day du thong tin address hay chua
		
		// khi thay doi gia tri trong address customer o phan billing
		$MW_Onestepcheckout("#billing-address-select").change(function(){			
			if(flag==1){	//  ship the same billing
					change_select=0;
					if(this.value==""){	// new address						
						countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();	
						updateBillingForm(this.value,flag);
					}
					else{	
						updateBillingForm(this.value,flag); // update lai form address va load lai cac phuong thuc
					}								
				}				
				else{
					// chi cap nhat lai form thoi, khong cap nhat lai shipping type
					updateBillingForm(this.value,flag);
					change_select=1;
				}
			
		});
		
		// khi thay doi gia tri trong address customer o phan shipping
		$MW_Onestepcheckout("#shipping-address-select").change(function(){
			
				if(flag==0){	//no check ship the same billing
					change_select=1;		
					if(this.value==""){		// new address				
						countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();						
						if(countryid){		
						//neu select shipping ton tai. option hop le^ hay value khac rong~, khu? truong hop. option="" khi bi clearForm() khi click 	#ship_to_same_address	
						updateShippingForm(this.value); // value = shipping_address_id selected
						}
					}
					else{						
						val=$MW_Onestepcheckout("#shipping-address-select").val();
						if(val)
						updateShippingForm(this.value);	// value = shipping_address_id selected				
					}
				}
		});
		
		$MW_Onestepcheckout('#shipping\\:same_as_billing').click(function()
		{			
			if(hasadd)
			{
				address_id =  $MW_Onestepcheckout("#shipping-address-select").val();				
				updateShippingForm(address_id) ;
			}
			else
			{
				if(flag==0)
					{						
						if(this.checked==false)
							{		
								//xoa form shipping address chi? voi lan dau tien khi click vao shiptosameaddress
								if(!islogin)
									{
										$MW_Onestepcheckout('#shipping-new-address-form').clearForm();
									}
							}
							else
							{
								if(change==1)
								{	
									//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
									ctid=$MW_Onestepcheckout('#shipping\\:country_id');	
									updateShippingType();
									change=0;
								}
								if(change_select==0){	//kiem tra xem address select co bi change hay ko								
									if(!shipaddselect){
										countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
										if(countryid!="")									
										updateShippingType();
									}
									change_select=1;
							}
								//if(hasadd){								
									//updateShippingType();
								//}							
							}
					}
				}
		});
		
		$MW_Onestepcheckout("#ship_to_same_address").click(function(){
			 shipaddselect=$MW_Onestepcheckout("#shipping-address-select");
			 billaddselect=$MW_Onestepcheckout("#billing-address-select");
			if(this.checked==false){// calculate according to shipping
			// change step order
				$MW_Onestepcheckout("#mw-osc-p2").removeClass('onestepcheckout-numbers onestepcheckout-numbers-2').addClass('onestepcheckout-numbers onestepcheckout-numbers-3');
				$MW_Onestepcheckout("#mw-osc-p3").removeClass('onestepcheckout-numbers onestepcheckout-numbers-3').addClass('onestepcheckout-numbers onestepcheckout-numbers-4');
				$MW_Onestepcheckout("#mw-osc-p4").removeClass('onestepcheckout-numbers onestepcheckout-numbers-4').addClass('onestepcheckout-numbers onestepcheckout-numbers-5');
				
				flag=0;
					if(i==1)
					{
					//xoa form shipping address chi? voi lan dau tien khi click vao shiptosameaddress
						if(!islogin)
							{
						$MW_Onestepcheckout('#shipping-new-address-form').clearForm();  //fix cho th bi mat country_id doi voi shipping
							}
					i=0;
					}
					
					$MW_Onestepcheckout("#shipping_show").css('display','block');
					this.value=0;		//thuoc tinh' value =0 =>checkbox co checked dang trong
					if(islogin){

						change_select=1;

						if(change_select==0 || change==0){	//kiem tra xem address select co bi change hay ko							
							if(shipaddselect.val()==""){
								if(change==0){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
									countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
									if(countryid){									
									updateShippingType();
									change=1;
									}
								}
							}
							else{								
							countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();							
							if(countryid)							
							updateShippingType();
							}
							change_select=1;
						}
					}
					else{
						if(change==0){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
							countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
							if(countryid){							
							updateShippingType();
							change=1;
							}
						}			
					}
			}
			else{
				// change step order
				$MW_Onestepcheckout("#mw-osc-p2").removeClass('onestepcheckout-numbers onestepcheckout-numbers-3').addClass('onestepcheckout-numbers onestepcheckout-numbers-2');
				$MW_Onestepcheckout("#mw-osc-p3").removeClass('onestepcheckout-numbers onestepcheckout-numbers-4').addClass('onestepcheckout-numbers onestepcheckout-numbers-3');
				$MW_Onestepcheckout("#mw-osc-p4").removeClass('onestepcheckout-numbers onestepcheckout-numbers-5').addClass('onestepcheckout-numbers onestepcheckout-numbers-4');
				
					 flag=1;
					 shipping.setSameAsBilling(true);
					 $('shipping:same_as_billing').checked = false;
					 $MW_Onestepcheckout('#shipping_show').css('display','none');
					 this.value=1;	
					
					if(islogin){
						countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
						if(countryid){						
						updateShippingType();
						change_select=0;
						}
						if(change_select!=0 ||change==1){	//kiem tra xem address select co bi change hay ko
							if(billaddselect.val()==""){
									if(change==1){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
										countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
										if(countryid){										
										updateShippingType();
										change=0;
										}
									}
								}
								else{
								countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
								if(countryid)								
								updateShippingType();
								}
								change_select=0;
						}
					}
					else{
						if(change==1){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
							countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
							if(countryid){							
							updateShippingType();
							change=0;
							}
						}
					}
			}
		});
		
		
		$MW_Onestepcheckout('#register_new_account').click(function(){				
				if(this.checked==true){
					$MW_Onestepcheckout('#register-customer-password').css('display','block');
					this.value = 1;
					}
				else{
					this.value = 0;
					$MW_Onestepcheckout('#register-customer-password').css('display','none');
					$MW_Onestepcheckout('#register-customer-password').clearForm();
					}
				});
		
		$MW_Onestepcheckout('#subscribe_newsletter').click(function(){				
				if(this.checked==true){
					this.value = 1;
				}
				else{
					this.value = 0;
				}
		});	
		
		$MW_Onestepcheckout.fn.clearForm=function(){			
			$MW_Onestepcheckout(':input', this).each(function() {					
					var type = $MW_Onestepcheckout(this).get(0).type;	//.type can replate : .name .class .
					var tag = $MW_Onestepcheckout(this).get(0).tagName.toLowerCase();					
					if (type == 'text' || type == 'password' || tag == 'textarea'){
						if((this.id =='billing:postcode' || this.id =='shipping:postcode') && this.value =='.')
							{
							this.value = '';
							}
						if(this.id!='billing:city' && this.id!='billing:taxvat' && this.id!='billing:day' && this.id!='billing:month' && this.id!='billing:year' && this.id!='billing:postcode' && this.id !='billing:region' && this.id!='shipping:city' && this.id!='shipping:postcode' && this.id !='shipping:region' && (islogin && this.id!='billing:email')){
							this.value = '';
						}
						else if(this.value=='n/a'){							
							this.value= '';
						}
					}
					else if ((type == 'checkbox' || type == 'radio') && this.id != 'register_new_account' ){
						
						this.checked = false;
					}
					else if (tag == 'select'){
						if(this.id!='billing:country_id' && this.id!='shipping:country_id' && this.id!='billing:region_id' && this.id!='shipping:region_id'){
							this.selectedIndex = -1;
						}
					}
			});
		};
		
		$MW_Onestepcheckout('#allow_gift_messages').click(function(){
			if (this.checked==true){
				$MW_Onestepcheckout('#allow-gift-message-container').css('display','block');
					if(!islogin)
					{
						$MW_Onestepcheckout('input[id^="gift-message"]').val('');
					}
					else if(!hasadd)
					{
						$MW_Onestepcheckout('input[id^="gift-message-whole-to"]').val('');
						$MW_Onestepcheckout('input[id^="gift-message-"][id$="to"]').val('');
					}
				}
			else
				$MW_Onestepcheckout('#allow-gift-message-container').css('display','none');
		});
	
///////// load ajax khi change country
		if(country_load()){		
			$MW_Onestepcheckout('#billing\\:country_id').live("change", function(){
				if(flag==1){						
					updateShippingType();
					change=0;	//change=0 khi flag=1
					}
				else{
					change=1;		//khi #billing\\:country_id change trong luc flag=0 tuc' box shipping showing, de khi #ship_to_same_address dc click voi flag=1 tro lai thi` update shippingmethod
				}				//change=1 khi flag=0
			});
			
			$MW_Onestepcheckout('#shipping\\:country_id').live("change", function(){			
					if(flag==0){
					change=1;					
					updateShippingType();
					}
			});
		}
		
		
////////load khi change zip postcode
		if(zip_load()){
//			var val_zipbill_before=$MW_Onestepcheckout('#billing\\:postcode').val();
//			$MW_Onestepcheckout('#billing\\:postcode').live("blur", function(){//	$MW_Onestepcheckout('#billing\\:postcode').blur(function(event){
//				val=this.value;
//				if(val!="" && val_zipbill_before!=val){					
//					if($MW_Onestepcheckout('#billing\\:country_id').val())						
//						updateShippingType();
//				}
//				val_zipbill_before=val;
//			});
			
//			var val_zipship_before=$MW_Onestepcheckout('#shipping\\:postcode').val();
//			$MW_Onestepcheckout('#shipping\\:postcode').blur(function(event){
//				val=this.value;
//				if(val!="" && val_zipship_before!=val){					
//					if($MW_Onestepcheckout('#shipping\\:country_id').val())						
//						updateShippingType();
//				}
//				val_zipship_before=val;
//			});
		}
		
//////////load khi change state/province bien select 
		if(region_load()){
			$MW_Onestepcheckout('#billing\\:region_id').live("change", function(){ //$MW_Onestepcheckout('#billing\\:region_id').change(function(){
						if(flag==1){							
							updateShippingType();
							change=0;	//change=0 khi flag=1
							}
						else{
							change=1;		//khi #billing\\:country_id change trong luc flag=0 tuc' box shipping showing, de khi #ship_to_same_address dc click voi flag=1 tro lai thi` update shippingmethod
						}				
				});
				$MW_Onestepcheckout('#shipping\\:region_id').live("change",function(){
						if(flag==0){
						change=1;						
						updateShippingType();
						}
				});
			
//////////load khi change state/province bien text
//			var val_regionbill_before=$MW_Onestepcheckout('#billing\\:region').val();
//			$MW_Onestepcheckout('#billing\\:region').live("blur", function(event) { //{$MW_Onestepcheckout('#billing\\:region').blur(function(event){
//				val=this.value;
//				if(val!="" && val_regionbill_before!=val){					
//					if($MW_Onestepcheckout('#billing\\:country_id').val())						
//						updateShippingType();
//				}
//				val_regionbill_before=val;
//			});
			
//			var val_regionship_before=$MW_Onestepcheckout('#shipping\\:region').val();
//			$MW_Onestepcheckout('#shipping\\:region').blur(function(event){
//				val=this.value;
//				if(val!="" && val_regionship_before!=val){					
//					if($MW_Onestepcheckout('#shipping\\:country_id').val())						
//						updateShippingType();
//				}
//				val_regionship_before=val;
//			});
		}

//////////load khi change city 
		//if(city_load()){
//			var val_citybill_before=$MW_Onestepcheckout('#billing\\:city').val();
//		
//			$MW_Onestepcheckout('#billing\\:city').live("blur", function(event){
//			//$MW_Onestepcheckout('#billing\\:city').blur(function(event){
//				val=this.value;
//				if(val!="" && val_citybill_before!=val){					
//					if($MW_Onestepcheckout('#billing\\:country_id').val())						
//						updateShippingType();
//				}
//				alert(val_citybill_before);
//				val_citybill_before=val;
//			});
			
//			var val_cityship_before=$MW_Onestepcheckout('#shipping\\:city').val();
//			$MW_Onestepcheckout('#shipping\\:city').blur(function(event){
//				val=this.value;
//				if(val!="" && val_cityship_before!=val){					
//					if($MW_Onestepcheckout('#shipping\\:country_id').val())						
//						updateShippingType();
//				}
//				val_cityship_before=val;
//			});		
		//}
});

