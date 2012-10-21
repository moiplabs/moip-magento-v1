cartao = function(){
    document.getElementById('imagemcartao').style.opacity='1';
    document.getElementById('imagemtrans').style.opacity='0.4';
    document.getElementById('imageboleto').style.opacity='0.4';
	if (!document.getElementById('shipping:firstname').value && !document.getElementById('billing:firstname').value)
		{
 		document.getElementById('moip_o2preencha').style.display = 'block';
		document.getElementById('moip_boleto').style.display = 'none';
		document.getElementById('moip_debito').style.display = 'none';
		} else{
		 document.getElementById('moip_credito').style.display = 'block';
		 document.getElementById('moip_o2preencha').style.display = 'none';
		 document.getElementById('moip_boleto').style.display = 'none';
		 document.getElementById('moip_debito').style.display = 'none';
		}
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
                document.getElementById('imagemcartao').style.opacity='0.4';
                document.getElementById('imagemtrans').style.opacity='0.4';
                document.getElementById('imageboleto').style.opacity='1';
                document.getElementById('moip_credito').style.display='none'
				};
transf = function(){
				document.getElementById('moip_debito').style.display='block';
				document.getElementById('moip_o2preencha').style.display='none';
				document.getElementById('moip_boleto').style.display='none';
				document.getElementById('moip_credito').style.display='none';
                document.getElementById('imagemcartao').style.opacity='0.4';
                document.getElementById('imagemtrans').style.opacity='1';
                document.getElementById('imageboleto').style.opacity='0.4';
};

bb = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='1';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';			
};
bradesco = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='1';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';			
};
itau = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='1';
                document.getElementById('Banrisul').style.opacity='0.4';
				document.getElementById('pagdebito').style.display='block';			
};
banrisul = function(){
				document.getElementById('checkout-payment-o2ti-deb').style.display='none';
                document.getElementById('debbb').style.opacity='0.4';
                document.getElementById('debbradesco').style.opacity='0.4';
                document.getElementById('debitau').style.opacity='0.4';
                document.getElementById('Banrisul').style.opacity='1';
				document.getElementById('pagdebito').style.display='block';
};

