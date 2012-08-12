<?php
function smarty_function_position($params, &$smarty)
{
	$type = $params['type'];
	$key = (int)$params['key'];
	
	// Checar si es foto o descripción, luego si es par o impar
	if($type=='foto' && $key%2){
		return 'left';
	}
	else{
		return 'right';	
	}
}
?>