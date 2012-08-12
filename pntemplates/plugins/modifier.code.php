<?php
function smarty_modifier_code($string)
{
	$reemplazo = array('y'=>',&nbsp;');
	
    $primercaracter = $string{0};
	if(is_numeric($primercaracter)){
		return 'Clave '.strtr($string, $reemplazo);
	}
	else{
		return '';
	}
}
?>