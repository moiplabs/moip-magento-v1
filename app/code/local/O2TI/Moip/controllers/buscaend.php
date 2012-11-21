<?php if($_POST['meio'] != ""){?>
<style>
#divTelaAguarde, .secao, .divopcoes, .mopcoes, .botoes, .rodape  { display:none;}
.caixacampobranco {padding: 8px 8px 8px 8px;
margin-top: 5px;
background-color: #E0E2EE;
-moz-border-radius: 3px;
-moz-border-radius-bottomright: 10px;
-webkit-border-radius: 3px;
-webkit-border-bottom-right-radius: 10px;}
.caixacampoazul {
padding: 8px 8px 8px 8px;
margin-top: 5px;
background-color: #DADCEB;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
-moz-border-radius-bottomright: 10px;
-webkit-border-bottom-right-radius: 10px;
}
.conteudo {
max-width: 372px;
text-align: left;
padding: 10px;
}
</style>
<?php
include('phpQuery-onefile.php');
function simple_curl($url,$post=array(),$get=array()){
	$url = explode('?',$url,2);
	if(count($url)===2){
		$temp_get = array();
		parse_str($url[1],$temp_get);
		$get = array_merge($get,$temp_get);
	}
	$ch = curl_init($url[0]."?".http_build_query($get));
	curl_setopt ($ch, CURLOPT_POST, 1);
	curl_setopt ($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, false);
	curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	return curl_exec ($ch);
}
$cep = $_POST['s'];
$vSomeSpecialChars = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ç", "Ç", "ã", "Ã", "õ", "Õ");
$vReplacementChars = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "c", "C", "a", "A", "o", "O");
$cep = str_replace($vSomeSpecialChars, $vReplacementChars, $cep);
$cep = preg_replace ('/[^\p{L}\p{N}]/u', '+', $cep);
$html = simple_curl('http://m.correios.com.br/movel/buscaCepConfirma.do',array(
	'cepEntrada'=>''.utf8_encode($cep).'',
	'metodo'=>'buscarCep'
));
phpQuery::newDocumentHTML($html, $charset = 'utf-8');
echo $html;
?>
<?php } else {?>
<?php
include('phpQuery-onefile.php');
function simple_curl($url,$post=array(),$get=array()){
	$url = explode('?',$url,2);
	if(count($url)===2){
		$temp_get = array();
		parse_str($url[1],$temp_get);
		$get = array_merge($get,$temp_get);
	}
	$ch = curl_init($url[0]."?".http_build_query($get));
	curl_setopt ($ch, CURLOPT_POST, 1);
	curl_setopt ($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, false);
	curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	return curl_exec ($ch);
}

$cep = $_GET['cep'];
$html = simple_curl('http://m.correios.com.br/movel/buscaCepConfirma.do',array(
	'cepEntrada'=>$cep,
	'tipoCep'=>'',
	'cepTemp'=>'',
	'metodo'=>'buscarCep'
));
phpQuery::newDocumentHTML($html, $charset = 'utf-8');
$dados = 
array(
	"logradouro"=> trim(pq(".caixacampobranco .resposta:contains('Logradouro: ') + .respostadestaque:eq(0)")->html()),
	"bairro"=> trim(pq(".caixacampobranco .resposta:contains('Bairro: ') + .respostadestaque:eq(0)")->html()),
	"cidade/uf"=> trim(pq(".caixacampobranco .resposta:contains('Localidade / UF: ') + .respostadestaque:eq(0)")->html()),
	"cep"=> trim(pq(".caixacampobranco .resposta:contains('CEP: ') + .respostadestaque:eq(0)")->html())
);
$dados['cidade/uf'] = explode('/',$dados['cidade/uf']);
$dados['cidade'] = trim($dados['cidade/uf'][0]);
$dados['uf'] = trim($dados['cidade/uf'][1]);
unset($dados['cidade/uf']);
if($dados['logradouro'] != ""){
         $texto = $dados['tipo_logradouro']." ".$dados['logradouro'].":".$dados['bairro'].":".$dados['cidade'].":".$dados['uf'].";";
}
else {
	           $texto = " :Bairro".$dados['bairro'].":".$dados['cidade'].":".$dados['uf'].";";
}
echo $texto;
}
?>
