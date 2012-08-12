<?php
function catalogo_ajax_pruebas()
{
    $cliente = array(	'name'    	 => FormUtil::getPassedValue('name', null, 'post'),
						'tel'        => FormUtil::getPassedValue('tel', null, 'post'),
						'mail' 		 => FormUtil::getPassedValue('mail', null, 'post'),
						'cotizacion' => FormUtil::getPassedValue('cotizacion', null, 'post'));

    $regresar = pnModAPIFunc('catalogo', 'user', 'nuevoCliente', $cliente);

    return $regresar;
}
