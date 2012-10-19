function timeoutProcess()
{
	val=$MW_Onestepcheckout("#shipping-address-select").val();
	if(val)
	//updateShippingType(null,$MW_Onestepcheckout("#shipping-address-select").val());
	//updateShippingType("select_add",$MW_Onestepcheckout("#shipping-address-select").val());	//fes
	updateShippingType(add('shipping'));
}
// function timeoutProcess_zipcode(){
	// val=$MW_Onestepcheckout('#billing\\:postcode').val();
	// if((val!='')&&())
	
// }
 function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
 } typeof(id3) == "undefined"
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
	// str_val=str_val+$MW_Onestepcheckout("#"+str+"\\:country_id").val()+",";
	// str_val=str_val+$MW_Onestepcheckout("#"+str+"\\:postcode").val()+",";
	// str_val=str_val+$MW_Onestepcheckout("#"+str+"\\:region_id").val()+",";
	// str_val=str_val+$MW_Onestepcheckout("#"+str+"\\:region").val()+",";
	// str_val=str_val+$MW_Onestepcheckout("#"+str+"\\:city").val();
	return str_val;
 }
$MW_Onestepcheckout(function(){
		
		var flag=1;	//kiem tra checkbox shiptosameaddress co duoc check hay uncheck
		var i=1;
		// var changebilling;
		// var changeshipping;
		//////////CONFIGURATION
		
		////////
		var change=0;		//cho biet tag select -coutryid cua billing va shipping co bi change hay ko,=1 la bi change
		var change_select=0;//cho biet tag select #billing-address-select(khi acc login va` co address) co bi change hay ko, =1 la bi change
		var timer;
		var islogin = logined();	//cho biet customer login hay chua
		var hasadd = hasaddress();	//cho biet customer co day du thong tin address hay chua
		// var payment_method_changed = -1;
		// if(payment_load()){
			// $MW_Onestepcheckout(".payment_method_handle").click(function(){alert("asdsd");
					// if(this.value != payment_method_changed){
						// updatePaymentMethod(this.value);	
						// payment_method_changed = this.value;
					// }
			// });
		// }
		// $MW_Onestepcheckout("#billing-address-select").change(function(){
			 // //alert(this.value);
			 // if(!this.value==1)
			 // $MW_Onestepcheckout("#billing-new-address-form").css('display','block');
			 // else
			 // $MW_Onestepcheckout("#billing-new-address-form").css('display','none');
			 // });
		// $MW_Onestepcheckout("#shipping-address-select").change(function(){
			 // //alert(this.value);

			 // });

		$MW_Onestepcheckout("#billing-address-select").change(function(){
				if(flag==1){	//cho phep billing ajax
					change_select=0;
					if(this.value==""){		//neu select "new address" thi` value=""
						countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
						//updateShippingType(countryid);
						//updateShippingType("country",countryid);	//fes
						updateShippingType();
					}
					else{					//neu select address customer
					//updateShippingType(null,this.value);		//this.value la` so cu the (vd: 2,4,6) se duoc xu ly trong controller se lay ra duoc 1 chuoi viet tat coutry cua customer nhu "US" 
					//updateShippingType("select_add",this.value);	//fes	
					updateShippingType();
					}				//	updateShippingType(null,this.value); //tham so 1 se lay chuoi viet tat ten country (vd:"US" hay "VN")khi select #billing:country_id hay #shipping:country_id				
				}				
				else{
					change_select=1;
				}
		});
		$MW_Onestepcheckout("#shipping-address-select").change(function(){
				if(flag==0){	//cho phep shipping ajax
					change_select=1;		
					if(this.value==""){
						countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
						if(countryid){		//neu select shipping ton tai. option hop le^ hay value khac rong~, khu? truong hop. option="" khi bi clearForm() khi click 	#ship_to_same_address	
						//alert(countryid);
							//updateShippingType(countryid);
							//updateShippingType("country",countryid);						//fes				
							updateShippingType();
						}
						
					}
					else{
						// a=$MW_Onestepcheckout("#shipping-address-select").val();
						// alert(a);
						val=$MW_Onestepcheckout("#shipping-address-select").val();
						if(val)
						updateShippingType();
						//clearTimeout(timer);
						//timer = setTimeout("timeoutProcess()",1500);
					}
				}
		});
		$MW_Onestepcheckout('#shipping\\:same_as_billing').click(function(){
					if(flag==0){		//cho phep shipping ajax
						if(this.checked==false){			//xoa form shipping address chi? voi lan dau tien khi click vao shiptosameaddress
							$MW_Onestepcheckout('#shipping-new-address-form').clearForm();
						}
						else{
							//billaddselect=$MW_Onestepcheckout("#billing-address-select").val();
							shipaddselect=$MW_Onestepcheckout("#shipping-address-select").val();
							//alert(change);
							if(change==1){		//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
								ctid=$MW_Onestepcheckout('#shipping\\:country_id');			
								//updateShippingType(ctid.attr("value"));
								//updateShippingType("country",ctid.attr("value"));		//fes
								updateShippingType();
								change=0;
								}
							if(change_select==0){	//kiem tra xem address select co bi change hay ko
								//	alert(this.value);
								if(!shipaddselect){
									countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
									if(countryid!="")
									//updateShippingType(countryid);
									//updateShippingType("country",countryid);	//fes
									updateShippingType();
								}
								change_select=1;
							}
							if(hasadd){
								//updateShippingType(null,shipaddselect);
								//updateShippingType("select_add",shipaddselect);	//fes
								updateShippingType();
							}							
						}
					}
		//xu ly khi click Using billing address cua shipping
		});

		$MW_Onestepcheckout("#ship_to_same_address").click(function(){
			 shipaddselect=$MW_Onestepcheckout("#shipping-address-select");
			 billaddselect=$MW_Onestepcheckout("#billing-address-select");
			if(this.checked==false){
					flag=0;
					if(i==1){			//xoa form shipping address chi? voi lan dau tien khi click vao shiptosameaddress
						$MW_Onestepcheckout('#shipping-new-address-form').clearForm();  //fix cho th bi mat country_id doi voi shipping
					i=0;
					}
					$MW_Onestepcheckout("#shipping_show").css('display','block');
					this.value=0;		//thuoc tinh' value =0 =>checkbox co checked dang trong
					if(islogin){

						change_select=1;

						if(change_select==0 ||change==0){	//kiem tra xem address select co bi change hay ko
							//	alert(this.value);
							if(shipaddselect.val()==""){
								if(change==0){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
									countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
									if(countryid){
									//updateShippingType(countryid);
									//updateShippingType("country",countryid);	//fes
									updateShippingType();
									change=1;
									}
								}
							}
							else{
							countryid=$MW_Onestepcheckout("#shipping-address-select option:selected").val();
							if(countryid)
							//updateShippingType(null,countryid);
							//updateShippingType("select_add",countryid);	//fes
							updateShippingType();
							}
							change_select=1;
						}
					}
					else{
						if(change==0){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
							countryid=$MW_Onestepcheckout("#shipping\\:country_id option:selected").val();
							if(countryid){
							//updateShippingType(countryid);
							//updateShippingType("country",countryid);	//fes
							updateShippingType();
							change=1;
							}
						}			
					}
			}
			else{
					 flag=1;
					 //$MW_Onestepcheckout('#shipping_show').clearForm();
					 $MW_Onestepcheckout('#shipping_show').css('display','none');
					 this.value=1;	
					 //$MW_Onestepcheckout(this).attr('value','a11111111111111');

					//alert(change_select);
					if(islogin){
						countryid=$MW_Onestepcheckout("#billing-address-select option:selected").val();
						if(countryid){
						//updateShippingType(null,countryid);
						//updateShippingType("select_add",countryid);	//fes
						updateShippingType();
						change_select=0;
						}
						if(change_select!=0 ||change==1){	//kiem tra xem address select co bi change hay ko
							if(billaddselect.val()==""){
									if(change==1){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
										countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
										if(countryid){
										//updateShippingType(countryid);
										//updateShippingType("country",countryid);	//fes
										updateShippingType();
										change=0;
										}
									}
								}
								else{
								countryid=$MW_Onestepcheckout("#billing-address-select option:selected").val();
								if(countryid)
								//updateShippingType(null,countryid);
								//updateShippingType("select_add",countryid);	//fes
								updateShippingType();
								}
								change_select=0;
						}
					}
					else{
						if(change==1){//kiem tra xem countryid cua? shipping co bi change hay ko,neu bi thay doi thi thuc hien refresh lai shippingmethod
							countryid=$MW_Onestepcheckout("#billing\\:country_id option:selected").val();
							if(countryid){
							//updateShippingType(countryid);
							//updateShippingType("country",countryid);	//fes
							updateShippingType();
							change=0;
							}
						}
					}
			}
		});
		// $MW_Onestepcheckout(".billing_country").change(function(){
			 // if($MW_Onestepcheckout(".billing_country option:selected").text()=="United States"){
				// $MW_Onestepcheckout(".billing_region_id").css('display','block');
				// $MW_Onestepcheckout(".billing_region").css('display','none');
			 // }
			 // else{
				// $MW_Onestepcheckout(".billing_region").attr('value','');
				// $MW_Onestepcheckout(".billing_region").css('display','block');
				// $MW_Onestepcheckout(".billing_region_id").css('display','none');
			 // }
			 // });
		$MW_Onestepcheckout('#register_new_account').click(function(){
				//alert(flag);
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
				//alert(flag);
				if(this.checked==true){
					this.value = 1;
				}
				else{
					this.value = 0;
				}
		});				 
		$MW_Onestepcheckout.fn.clearForm=function(){
			console.log(this);
			//return ;
			//alert($MW_Onestepcheckout(':input',this).length);
			$MW_Onestepcheckout(':input', this).each(function() {
					//console.log(this.id);
					
					var type = $MW_Onestepcheckout(this).get(0).type;	//.type can replate : .name .class .
					var tag = $MW_Onestepcheckout(this).get(0).tagName.toLowerCase();
					//alert(type);
					if (type == 'text' || type == 'password' || tag == 'textarea'){
						if(this.id!='billing:city' && this.id!='billing:postcode' && this.id !='billing:region' && this.id!='shipping:city' && this.id!='shipping:postcode' && this.id !='shipping:region'){
							this.value = '';
						}
						else if(this.value=='n/a'){
							//console.log(this.id);
							this.value= '';
						}
					}
					else if (type == 'checkbox' || type == 'radio'){
						if(this.name!='register_new_account') this.checked = false;
					}
					else if (tag == 'select'){
						if(this.id!='billing:country_id' && this.id!='shipping:country_id'){
							this.selectedIndex = -1;
						}
					}
			});
		};
		if(country_load()){
			$MW_Onestepcheckout('#billing\\:country_id').change(function(){
					if(flag==1){
						//updateShippingType(this.value);
						//updateShippingType("country",this.value);	//fes
						updateShippingType();
						change=0;	//change=0 khi flag=1
						}
					else{
						change=1;		//khi #billing\\:country_id change trong luc flag=0 tuc' box shipping showing, de khi #ship_to_same_address dc click voi flag=1 tro lai thi` update shippingmethod
					}				//change=1 khi flag=0
			});
			$MW_Onestepcheckout('#shipping\\:country_id').change(function(){
					if(flag==0){
					change=1;
					//updateShippingType(this.value);
					//updateShippingType("country",this.value);	//fes
					updateShippingType();
					}
			});
		}
		// //valid form khi click nut PLACE ORDER
		// $MW_Onestepcheckout('.btn-checkout').click(function(e){
					// // First validate the form
					
					// var form = new VarienForm('onestep_form');
					// var logic=true;
					// if(!$MW_Onestepcheckout("input[name=payment[method]]:checked").val() || !$MW_Onestepcheckout("input[name=shipping_method]:checked").val()){
					// logic=false;
					// }
					// if(!$MW_Onestepcheckout("input[name=payment[method]]:checked").val()){	//neu cac method payment chua duoc chon
						// if(!$MW_Onestepcheckout('#advice-required-entry_payment').length){	//neu' phan tu valid chua duoc hien len, thi` cho no hien len
						// $MW_Onestepcheckout('#checkout-payment-method-load').append('<dt><div class="validation-advice" id="advice-required-entry_payment" style="">'+message_payment+'</div></dt>');
						// //if($MW_Onestepcheckout('#advice-required-entry_payment').attr('display')!="none"){
						// //$MW_Onestepcheckout('#advice-required-entry_payment').css('display','block');
						// }
					// }
					// else
					// $MW_Onestepcheckout('#advice-required-entry_payment').remove();
					// //$MW_Onestepcheckout('#advice-required-entry_payment').css('display','none');
					
					// if(!$MW_Onestepcheckout("input[name=shipping_method]:checked").val()){
						// if(!$MW_Onestepcheckout('#advice-required-entry_shipping').length){
						// $MW_Onestepcheckout('#checkout-shipping-method-loadding').append('<dt><div class="validation-advice" id="advice-required-entry_shipping" style="">'+message_ship+'</div></dt>');
						// //if($MW_Onestepcheckout('#advice-required-entry_shipping').attr('display')!="none"){
						// //$MW_Onestepcheckout('#advice-required-entry_shipping').css('display','block');
						// }

					// }
					// else
					// $MW_Onestepcheckout('#advice-required-entry_shipping').remove();
					// //$MW_Onestepcheckout('#advice-required-entry_shipping').css('display','none');

					// if(!form.validator.validate())	{
						// Event.stop(e);				
					// }
					// else	{
						// //console.trace(e);
						// /* Disable button to avoid multiple clicks */
						// // var element = e.element();
						// // element.disabled = true;

						// /* Submit the form */
						// // var logic=true;
						// // if(!$MW_Onestepcheckout("input[name=payment[method]]:checked").val() || !$MW_Onestepcheckout("input[name=shipping_method]:checked").val())
						// // logic=false;
						
						// // if(!$MW_Onestepcheckout("input[name=payment[method]]:checked").val()){
							// // logic=false;
							// // if(!$MW_Onestepcheckout('#advice-required-entry_payment').length){
							// // $MW_Onestepcheckout('#checkout-payment-method-load').append('<dt><div class="validation-advice" id="advice-required-entry_payment" style="">Please click select one any button radio on payment method!</div></dt>');
							// // }
						// // }
						// // else
						// // $MW_Onestepcheckout('#advice-required-entry_payment').remove();
						
						// // if(!$MW_Onestepcheckout("input[name=shipping_method]:checked").val()){
							// // if(!$MW_Onestepcheckout('#advice-required-entry_shipping').length){
							// // $MW_Onestepcheckout('#checkout-shipping-method-loadding').append('<dt><div class="validation-advice" id="advice-required-entry_shipping" style="">Please click select one any button radio on shipping method!</div></dt>');
							// // }

						// // }
						// // else
						// // $MW_Onestepcheckout('#advice-required-entry_shipping').remove();
						// if(logic){
						// $MW_Onestepcheckout('#onestep_form').submit();
						// $MW_Onestepcheckout('.btn-checkout').attr("disabled","disabled");
						// }
						// else {
							// return false;
						// }
					// }
					// return false;
		// });
		
		$MW_Onestepcheckout('#allow_gift_messages').click(function(){
				if (this.checked==true)
					$MW_Onestepcheckout('#allow-gift-message-container').css('display','block');
				else
					$MW_Onestepcheckout('#allow-gift-message-container').css('display','none');
			});
		//////update email/////
			// var val_emailbill_before=$MW_Onestepcheckout('#billing\\:email').val();
			// $MW_Onestepcheckout('#billing\\:email').blur(function(event){
				// val=this.value;
				// emailvalidated=Validation.get('IsEmpty').test(val) || /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*@([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z0-9-]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*\.(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]){2,})$/i.test(val);
				// //alert(emailvalidated);		//validate chi cho moi field email
				// if(val!="" && val_emailbill_before!=val && emailvalidated){
					// updateEmailmsg(val);
				// }
				// val_emailbill_before=val;
			// });
		
		/////////////
		if(zip_load()){
			var val_zipbill_before=$MW_Onestepcheckout('#billing\\:postcode').val();
			$MW_Onestepcheckout('#billing\\:postcode').blur(function(event){
				val=this.value;
				
				//alert(val);
				//isnum=isInt(val);	//kiem tra so nguyen kieu 1
				//isint=((val % 1) == 0)? true:false;	//kiem tra so nguyen kieu 2
				// if(!isnum){
					// if(!$MW_Onestepcheckout('#advice-validate-digits-billing\\:postcode').length){
							// $MW_Onestepcheckout('#billing\\:postcode').after('<div style="" id="advice-validate-digits-billing:postcode" class="validation-advice">Please use numbers only in this field.</div>');
							// $MW_Onestepcheckout('#billing\\:postcode').addClass('validation-failed');
							// $MW_Onestepcheckout('#advice-required-entry-billing\\:postcode').remove();
					// }
				// }
				// else{
				// $MW_Onestepcheckout('#advice-validate-digits-billing\\:postcode').remove();
				// $MW_Onestepcheckout('#billing\\:postcode').removeClass('validation-failed');
				// val_array(){
					// 'country'=>$MW_Onestepcheckout('#billing\\:country_id').val(),
					// 'zipcode'=>$MW_Onestepcheckout('#billing\\:postcode').val(),
					// 'region'=>$MW_Onestepcheckout('#billing\\:region').val(),
					// 'region_id'=>$MW_Onestepcheckout('#billing\\:region_id').val(),
					// 'city'=>$MW_Onestepcheckout('#billing\\:city').val()
				// };
				if(val!="" && val_zipbill_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#billing\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_zipbill_before=val;
			});
			
			var val_zipship_before=$MW_Onestepcheckout('#shipping\\:postcode').val();
			$MW_Onestepcheckout('#shipping\\:postcode').blur(function(event){
				val=this.value;
				if(val!="" && val_zipship_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#shipping\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_zipship_before=val;
			});
		}
		///////////	
		if(region_load()){
				$MW_Onestepcheckout('#billing\\:region_id').change(function(){
						if(flag==1){
							//updateShippingType(this.value);
							//updateShippingType("region_id",this.value);	//fes
							updateShippingType();
							change=0;	//change=0 khi flag=1
							}
						else{
							change=1;		//khi #billing\\:country_id change trong luc flag=0 tuc' box shipping showing, de khi #ship_to_same_address dc click voi flag=1 tro lai thi` update shippingmethod
						}				
				});
				$MW_Onestepcheckout('#shipping\\:region_id').change(function(){
						if(flag==0){
						change=1;
						//updateShippingType(this.value);
						//updateShippingType("region_id",this.value);	//fes
						updateShippingType();
						}
				});
			
			/////////
			var val_regionbill_before=$MW_Onestepcheckout('#billing\\:region').val();
			$MW_Onestepcheckout('#billing\\:region').blur(function(event){
				val=this.value;
				if(val!="" && val_regionbill_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#billing\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_regionbill_before=val;
			});
			
			var val_regionship_before=$MW_Onestepcheckout('#shipping\\:region').val();
			$MW_Onestepcheckout('#shipping\\:region').blur(function(event){
				val=this.value;
				if(val!="" && val_regionship_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#shipping\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_regionship_before=val;
			});
		}
////////////////
		if(city_load()){
			var val_citybill_before=$MW_Onestepcheckout('#billing\\:city').val();
			$MW_Onestepcheckout('#billing\\:city').blur(function(event){
				val=this.value;
				if(val!="" && val_citybill_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#billing\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_citybill_before=val;
			});
			
			var val_cityship_before=$MW_Onestepcheckout('#shipping\\:city').val();
			$MW_Onestepcheckout('#shipping\\:city').blur(function(event){
				val=this.value;
				if(val!="" && val_cityship_before!=val){
					//alert(val);
					if($MW_Onestepcheckout('#shipping\\:country_id').val())
						//updateShippingType();
						//updateShippingType('zipcode',val);	//fes
						updateShippingType();
				}
				val_cityship_before=val;
			});		
		}
});
