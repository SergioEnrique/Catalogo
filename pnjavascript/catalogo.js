var subTotal = 0;
var alturaReal;

var Objeto = function (clave,nombre,precio,cantidad,fecha) {
	this.clave = clave;
	this.nombre = nombre;
	this.precio = precio;
	this.cantidad = cantidad;
	this.fecha = fecha;
}

$(document).ready(function()
{	
	userName = $.jStorage.get('userName', false);
	if(!userName)
		return false;
	
	var url = document.location.href;
	url = url.substring(url.lastIndexOf('/')+1);
	
	if(url == "chekout")
		rellenarDatos();
	else {
		$('#ZonaCotizacion').attr('style','text-align:right; float:right; visibility:visible; width:150px;');
		$('#CotizacionNombre').text(userName);
		loadObjetos();
	}
	
	alturaReal = $('#Itemcontenedor').attr('offsetHeight');
	if($('#Itemcontenedor').attr('offsetHeight') < $('#ZonaCotizacion').attr('offsetHeight'))
		$('#Itemcontenedor').attr('style', 'height:'+$('#ZonaCotizacion').attr('offsetHeight')+'px;');
});

function rellenarDatos()
{
	userName = $.jStorage.get('userName', false);
	userTel = $.jStorage.get('userTel', false);
	userMail = $.jStorage.get('userMail', false);
	var cotizacion='{';
	var product = '';
	var index = $.jStorage.index();
	
	
	if ($('#billing_name').val()=="")
		$('#billing_name').val(userName);
		
	if ($('#billing_email').val()=="")
		$('#billing_email').val(userMail);
		
	if ($('#billing_phone').val()=="")
		$('#billing_phone').val(userTel);

	for (x=0;x<index.length;x++){
		var key = index[x];
		var objeto = $.jStorage.get(key)
		
		if(!isNaN(key))
		{
			product = '<tr><td class="product-name">'+objeto.nombre+'</td><td class="" style="text-align:center;">$'+objeto.precio+'</td><td class="product-quantity" style="text-align:center;">'+objeto.cantidad+'</td><td class="product-total"><span class="amount">$'+((objeto.precio)*(objeto.cantidad)).toFixed(2)+'</span></td></tr>';
			$('#products').append(product);
			subTotal = subTotal + (objeto.precio)*(objeto.cantidad);
			
			if(x!=0)
				cotizacion = cotizacion+',"'+key+'":'+JSON.stringify(objeto);
			else
				cotizacion = cotizacion+'"'+key+'":'+JSON.stringify(objeto);
		}
		product = '';
	}
	
	$('#cotizacion').val(cotizacion+'}');
	imprimirTotal(subTotal);
	subTotal = 0;

}

function imprimirTotal(suma)
{
	var descuento = 0;
	var subTotal = 0;
	if (suma>1000 && suma<=2000)
	{
		subTotal = suma*.9;
		descuento = 10;
	}
	else if (suma>2000 && suma<=3000)
	{
		subTotal = suma*.8;
		descuento = 20;
	}
	else if (suma>3000)
	{
		subTotal = suma*.7;
		descuento = 30;
	}
	else
	{
		subTotal = suma; 
	}
	
	$('#CotizacionSuma').text('$'+suma.toFixed(2));
	$('#CotizacionDescuento').text(descuento+'%');
	$('#CotizacionSubTotal').text('$'+subTotal.toFixed(2));
	$('#CotizacionIVA').text('$'+(subTotal*.16).toFixed(2));
	$('#CotizacionTotal').text('$'+(subTotal*1.16).toFixed(2));
}

function cerrarSesion()
{
	$.jStorage.flush();
	loadObjetos();
	$('#ZonaCotizacion').attr('style','text-align:right; float:left; visibility:hidden; width:0px;'); 
}

function eliminarObjeto(objeto)
{
	$.jStorage.deleteKey(objeto);
	loadObjetos();
	
	if($('#CotizacionTotal').text()==0)
		$('#CotizacionBox').attr('style', 'height:20px;');
	
	if(alturaReal > $('#ZonaCotizacion').attr('offsetHeight'))
		$('#Itemcontenedor').attr('style', '');
}

function loadObjetos(){
	
	$('#CotizacionBox').html('');
	var index = $.jStorage.index();

	for (x=0;x<index.length;x++){
		var key = index[x];
		var objeto = $.jStorage.get(key)
		
		if(!isNaN(key))
		{
			subTotal = subTotal + (objeto.precio)*(objeto.cantidad);
			if (key != idActual)
				$('#CotizacionBox').append('<div id="'+key+'" name="'+key+'"><a href="#" onclick="eliminarObjeto('+key+');return false;"><img src="/modules/catalogo/pnimages/delete.jpg" /></a> <span style="text-align:center"><strong><a href="http://www.agarti.com.mx/catalogo/main/item/'+(objeto.nombre).replace(/ /gi,"-")+'">'+objeto.nombre+'</a></strong></span><br />Cantidad: <span>'+objeto.cantidad+'</span><br />P. Unitario: $<span>'+objeto.precio+'</span><br /><br /></div>');
			else
				$('#CotizacionBox').prepend('<div id="'+key+'" name="'+key+'"><a href="#" onclick="eliminarObjeto('+key+');return false;"><img src="/modules/catalogo/pnimages/delete.jpg" /></a> <span style="text-align:center"><strong>'+objeto.nombre+'</strong></span><br />Cantidad: <span>'+objeto.cantidad+'</span><br />P. Unitario: $<span>'+objeto.precio+'</span><br /><br /></div>');
				
			$('#ItemCantidad'+objeto.clave).val(objeto.cantidad);
		}//if
	}//for

	imprimirTotal(subTotal);
	subTotal = 0;

}//function loadObjetos

function newObjeto(id,clave,nombre,precio,cantidad,fecha){
	var datosObjeto = new Objeto(clave,nombre,precio,cantidad,fecha);
	$.jStorage.set(id, datosObjeto)
	
	var pars = 'module=catalogo&func=pruebas'
				+'&name='+$.jStorage.get('userName')
				+'&tel='+$.jStorage.get('userTel')
				+'&mail='+$.jStorage.get('userMail')
				+'&cotizacion='+JSON.stringify($.jStorage.get(id));
				
		$.ajax(
			{
				type: 'POST',
				url: 'http://www.agarti.com.mx/ajax.php',
				data: pars,
				
				beforeSend:function(){
				// this is where we append a loading image
				//	$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
				},
				success:function(data){
				// successful request; do something with the data
				//	$('#ajax-panel').empty();
				//	$(data).find('item').each(function(i){
				//		$('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
				//	});
				},
				error:function(){
				// failed request; give feedback to user
				//	$('#ajax-panel').html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
			}
		});//end $.ajax()
		
}


function cotizar(id,code,name,price) {

	if($.jStorage.get('userName', 'vacio') == 'vacio'){
		

		AttentionBox.showMessage("Tu cotización está casi lista, para continuar ingresa tus datos.", 
		{ 
			modal  : true,
			inputs : 
			[
				{caption: "Nombre completo", required: true}, 
				{caption: "Teléfono", required: true, type: "number"}, 
				{caption: "E-mail", required: true}
			],
			callback: function(action, inputs)
			{
				var message = "";
		
				if (action != "CANCELLED")
				{												
					$.jStorage.set('userName', inputs[0].value);
					$.jStorage.set('userTel', inputs[1].value);
					$.jStorage.set('userMail', inputs[2].value);
					
					var userName = $.jStorage.get('userName');
					$('#CotizacionNombre').text(userName);
					
					$('#ZonaCotizacion').attr('style','text-align:right; float:right; visibility:visible; width:150px;'); 
					newObjeto(id,code,name,price,$('#ItemCantidad'+code).val(),'fecha');
					loadObjetos();
					enviarAjax = true;
					
				}
				else
				{
					message = "No pudimos capturar tus datos. Por favor, inténtalo nuevamente.";
					AttentionBox.showMessage(message); 							
				}
						
			 }
		});//AttentionBox end


	}//if (sin userName) end
	else
	{
		$('#ZonaCotizacion').attr('style','text-align:right; float:right; visibility:visible; width:150px;');
		newObjeto(id,code,name,price,$('#ItemCantidad'+code).val(),'fecha');
		loadObjetos();	
	}
	
	if($('#Itemcontenedor').attr('offsetHeight') < $('#ZonaCotizacion').attr('offsetHeight'))
		$('#Itemcontenedor').attr('style', 'height:'+$('#ZonaCotizacion').attr('offsetHeight')+'px;');
}//function