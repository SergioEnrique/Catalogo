<?php
function smarty_modifier_size($string)
{
    if(empty($string)){
		return '';
	}
	else{
		return 'Medidas: '.$string;	
	}
}
?>