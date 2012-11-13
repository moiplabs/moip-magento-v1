cartao = function(){
    document.getElementById('imagemcartao').style.opacity='1';
    document.getElementById('imagemtrans').style.opacity='0.4';
    document.getElementById('imageboleto').style.opacity='0.4';
	 $MW_Onestepcheckout("#moip_credito").show("slow");
		 document.getElementById('moip_o2preencha').style.display = 'none';
		 document.getElementById('moip_boleto').style.display = 'none';
		 document.getElementById('moip_debito').style.display = 'none';
$MW_Onestepcheckout('#advice-required-entry_payment_o2ti').remove();
	if (!document.getElementById('shipping:firstname').value) {
 		document.getElementById('credito_portador_nome').value = document.getElementById('billing:firstname').value + ' ' + document.getElementById('billing:lastname').value;
 		document.getElementById('credito_portador_telefone').value = document.getElementById('billing:telephone').value;
		document.getElementById('credito_portador_cpf').value = document.getElementById('billing:taxvat').value;
		document.getElementById('credito_portador_nascimento').value = document.getElementById('billing:day').value + '/' + document.getElementById('billing:month').value + '/' + document.getElementById('billing:year').value
} else {
 		document.getElementById('credito_portador_nome').value = document.getElementById('shipping:firstname').value + ' ' + document.getElementById('shipping:lastname').value;
 		document.getElementById('credito_portador_telefone').value = document.getElementById('shipping:telephone').value;
}
  };


boleto = function(){
				document.getElementById('moip_debito').style.display='none';
                document.getElementById('moip_o2preencha').style.display='none';
                document.getElementById('moip_boleto').style.display='block';
				$MW_Onestepcheckout('#moip_boleto').hide();
				$MW_Onestepcheckout("#moip_boleto").show("slow");
                document.getElementById('imagemcartao').style.opacity='0.4';
                document.getElementById('imagemtrans').style.opacity='0.4';
                document.getElementById('imageboleto').style.opacity='1';
                document.getElementById('moip_credito').style.display='none';
$MW_Onestepcheckout('#advice-required-entry_payment_o2ti').remove();

				};
transf = function(){
				document.getElementById('moip_debito').style.display='block';
				$MW_Onestepcheckout('#moip_debito').hide();
				$MW_Onestepcheckout("#moip_debito").show("slow");
				document.getElementById('moip_debito_bandeiras').style.display='block';
				$MW_Onestepcheckout('#moip_debito_bandeiras').hide();
				$MW_Onestepcheckout("#moip_debito_bandeiras").show("slow");
				document.getElementById('moip_o2preencha').style.display='none';
				document.getElementById('moip_boleto').style.display='none';
				document.getElementById('moip_credito').style.display='none';
                document.getElementById('imagemcartao').style.opacity='0.4';
                document.getElementById('imagemtrans').style.opacity='1';
                document.getElementById('imageboleto').style.opacity='0.4';
$MW_Onestepcheckout('#advice-required-entry_payment_o2ti').remove();
};

bb = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='1';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';
				$MW_Onestepcheckout('#pagdebito').hide();
				$MW_Onestepcheckout("#pagdebito").show("slow");
document.getElementById('checkout-payment-banco').style.display='none';
			
};
bradesco = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='1';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';	
				$MW_Onestepcheckout('#pagdebito').hide();
				$MW_Onestepcheckout("#pagdebito").show("slow");
document.getElementById('checkout-payment-banco').style.display='none';
};
itau = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='1';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';	
				$MW_Onestepcheckout('#pagdebito').hide();
				$MW_Onestepcheckout("#pagdebito").show("slow");
document.getElementById('checkout-payment-banco').style.display='none';
};
banrisul = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='1';
				document.getElementById('pagdebito').style.display='block';
				$MW_Onestepcheckout('#pagdebito').hide();
				$MW_Onestepcheckout("#pagdebito").show("slow");
document.getElementById('checkout-payment-banco').style.display='none';
};
visa = function(){
   document.getElementById('Visa').style.opacity='1';
   document.getElementById('Mastercard').style.opacity='0.4';
   document.getElementById('Diners').style.opacity='0.4';
   document.getElementById('AmericanExpress').style.opacity='0.4';
   document.getElementById('Hipercard').style.opacity='0.4';
document.getElementById('checkout-payment-bandeira').style.display='none';

};
mastercard = function(){
   document.getElementById('Visa').style.opacity='0.4';
   document.getElementById('Mastercard').style.opacity='1';
   document.getElementById('Diners').style.opacity='0.4';
   document.getElementById('AmericanExpress').style.opacity='0.4';
   document.getElementById('Hipercard').style.opacity='0.4';
document.getElementById('checkout-payment-bandeira').style.display='none';
};
americanexpress = function(){
   document.getElementById('Visa').style.opacity='0.4';
   document.getElementById('Mastercard').style.opacity='0.4';
   document.getElementById('Diners').style.opacity='0.4';
   document.getElementById('AmericanExpress').style.opacity='1';
   document.getElementById('Hipercard').style.opacity='0.4';
document.getElementById('checkout-payment-bandeira').style.display='none';
};

diners = function(){
   document.getElementById('Visa').style.opacity='0.4';
   document.getElementById('Mastercard').style.opacity='0.4';
   document.getElementById('Diners').style.opacity='1';
   document.getElementById('AmericanExpress').style.opacity='0.4';
   document.getElementById('Hipercard').style.opacity='0.4';
document.getElementById('checkout-payment-bandeira').style.display='none';
};

hipercard = function(){
   document.getElementById('Visa').style.opacity='0.4';
   document.getElementById('Mastercard').style.opacity='0.4';
   document.getElementById('Diners').style.opacity='0.4';
   document.getElementById('AmericanExpress').style.opacity='0.4';
   document.getElementById('Hipercard').style.opacity='1';
document.getElementById('checkout-payment-bandeira').style.display='none';
};
alterar = function(){
	document.getElementById('alterar').style.display='none';
	document.getElementById('formcli').style.display='block';
	document.getElementById('manter').style.display='block';
	$MW_Onestepcheckout('#formcli').hide();
	$MW_Onestepcheckout("#formcli").show("slow");
};
manter = function(){
	document.getElementById('manter').style.display='none';
	document.getElementById('formcli').style.display='none';
	document.getElementById('alterar').style.display='block';
	};