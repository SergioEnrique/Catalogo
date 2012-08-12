<?php
/**
 * Zikula Application Framework
 *
 * @copyright (c) 2001, Zikula Development Team
 * @link http://www.zikula.org
 * @version $Id: pnuserapi.php 31 2008-12-23 20:55:41Z Guite $
 * @license GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */

function catalogo_userapi_nuevoCliente($args)
{
	/*
	$pntables = pnDBGetTables();
    $column   = $pntables['catalogo_people_column'];
    $where    = "WHERE $column[mail]='".$args[mail]."'";

    $obj = DBUTil::updateObject ($args, 'catalogo_people', $where);
	 */

    $obj = DBUtil::insertObject($args, 'catalogo_people', 'id');
	
    if($obj == false) {
        return LogUtil::registerError(__('¡Error! Intento fallido en la creación del producto.', $dom));
    }
    return $obj;
}

function catalogo_userapi_nuevoPedido($args)
{
    $obj = DBUtil::insertObject($args, 'catalogo_pedidos', 'id');
	
    if($obj == false) {
        return LogUtil::registerError(__('¡Error! Intento fallido al crear pedido.', $dom));
    }
    return $obj;
}

function catalogo_userapi_procesarCotizacion($args)
{
	$productos = json_decode($args['cotizacion'], true);
	$suma = 0;
				
	$destinatario = "ventas@agarti.com.mx"; 
	$asunto = "Cotización o Pedido en Agarti"; 
	$cuerpo = ' 
		<html> 
		<head> 
		   <title>Cotización o Pedido hecho desde Agarti</title> 
		</head> 
		<body> 
		<h1>Cotización o Pedido hecho desde Agarti</h1> 
		<p> 
		<b>Nombre: </b>'.$args['billing_name'].'<br />
		<b>Dirección: </b>'.$args['billing_address'].'<br />
		<b>Ciudad: </b>'.$args['billing_city'].'<br />
		<b>Estado: </b>'.$args['billing_state'].'<br />
		<b>C.P.: </b>'.$args['billing_postcode'].'<br />
		<b>Correo: </b>'.$args['billing_email'].'<br />
		<b>Teléfono: </b>'.$args['billing_phone'].'<br /><br />
		<b>Otras notas: </b>'.$args['oder_comments'].'<br />
		</p> 
		
		<b>Artículos cotizados:</b><br />
		<table class="shop_table">
					<thead>
						<tr>
							<th class="product-name">Producto</th>
							<th class="" width="90px">Precio Unitario</th>
							<th class="product-quantity" width="90px" style="text-align:center;">Cantidad</th>
							<th class="product-total" width="90px" style="text-align:center;">Totales</th>
						</tr>
					</thead>
					<tbody id="products">'; 
		
		foreach ($productos as $key=>$value)
		{
			$precio = $value['precio']*$value['cantidad'];
			$cuerpo.='<tr><td class="product-name">'.$value['nombre'].'</td><td class="" style="text-align:center;">$'.$value['precio'].'</td><td class="product-quantity" style="text-align:center;">'.$value['cantidad'].'</td><td class="product-total"><span class="amount">$'.$precio.'</span></td></tr>';
			$suma+=$precio;
		}
	
		$descuento = 0;
		if ($suma>1000 && $suma<=2000)
		{
			$subtotal = $suma*.9;
			$descuento = 10;
		}
		else if ($suma>2000 && $suma<=3000)
		{
			$subtotal = $suma*.8;
			$descuento = 20;
		}
		else if ($suma>3000)
		{
			$subtotal = $suma*.7;
			$descuento = 30;
		}
		else
			$subtotal = $suma; 
	
		$cuerpo.= ' </tbody>
			<tfoot>
				<tr class="cart-subtotal">
					<th colspan="3" style="text-align:right;"><strong>Suma</strong></th>
					<td><span class="amount" id="CotizacionSuma">$'.$suma.'</span></td>
				</tr>
				<tr class="shipping">
					<th colspan="3" style="text-align:right;"><strong>Descuento</strong></th>
					<td><span class="amount" id="CotizacionDescuento">'.$descuento.'%</span></td>
				</tr>      
				<tr class="total">
					<th colspan="3" style="text-align:right;"><strong>Sub-Total</strong></th>
					<td><strong><span class="amount" id="CotizacionSubTotal">$'.$subtotal.'</span></strong></td>
				</tr>
				<tr class="total">
					<th colspan="3" style="text-align:right;"><strong>IVA</strong></th>
					<td><strong><span class="amount" id="CotizacionIVA">$'.$subtotal*.16.'</span></strong></td>
				</tr>
				<tr class="total">
					<th colspan="3" style="text-align:right;"><strong>Total</strong></th>
					<td><strong><span class="amount" id="CotizacionTotal">$'.$subtotal*1.16.'</span></strong></td>
				</tr>
			</tfoot>
	
			</table>
			</body> 
			</html>';
	
	//para el envío en formato HTML 
	$headers = "MIME-Version: 1.0\r\n"; 
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
	
	//dirección del remitente 
	$headers .= 'From: '.$args['billing_name'].' '.$args['billing_email'].''; 
	
	if(!mail($destinatario,$asunto,$cuerpo,$headers))
		return false;
	
	$data = array(	'name'    	 	=> $args['billing_name'],
					'tel'       	=> $args['billing_phone'],
					'mail' 		 	=> $args['billing_email'],
					'address' 		=> $args['billing_address'],
					'city' 		 	=> $args['billing_city'],
					'state' 		=> $args['billing_state'],
					'postcode' 		=> $args['billing_postcode'],
					'notes' 		=> $args['oder_comments'],
					'subtotal' 		=> $subtotal,
					'shipping'		=> 0,
					'total'			=> $subtotal*1.16,
					'cotizacion'	=> $args['cotizacion']);
	
	$regresar = pnModAPIFunc('catalogo', 'user', 'nuevoPedido', $data);

	return $regresar;
}