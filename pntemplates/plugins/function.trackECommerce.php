<?php
// Tracking with Google Analytics in Ascyncronous mode
function smarty_function_trackECommerce($params, &$smarty)
{
	$dats = $params['dats'];
	$cotizacion = json_decode($dats['cotizacion'], true);
	
	$javascript = '<script type="text/javascript">
	
				  var _gaq = _gaq || [];
				  _gaq.push(["_setAccount", "UA-24231730-1"]);
				  _gaq.push(["_trackPageview"]);
				  _gaq.push(["_addTrans",
						"'.$dats['id'].'",   				// order ID - required
						"Agarti",  							// affiliation or store name
						"'.$dats['total'].'",    			// total - required
						"'.$dats['subtotal']*0.16.'",		// tax
						"'.$dats['shipping'].'",			// shipping
						"'.$dats['city'].'",     			// city
						"'.$dats['state'].'",    			// state or province
						"México"              				// country
				  ]);';
				
				   // add item might be called for every item in the shopping cart
				   // where your ecommerce engine loops through each item in the cart and
				   // prints out _addItem for each
				   
	foreach ($cotizacion as $key=>$value)
	{
		$javascript.= '_gaq.push(["_addItem",
						  "'.$dats['id'].'",         	// order ID - necessary to associate item with transaction
						  "'.$value['clave'].'",        // SKU/code - required
						  "'.$value['nombre'].'",    	// product name
						  "",							// category or variation
						  "'.$value['precio'].'",      	// unit price - required
						  "'.$value['cantidad'].'"		// quantity - required
						]);';
	}

	//submits transaction to the Analytics servers
	$javascript.= '_gaq.push(["_trackTrans"]); //submits transaction to the Analytics servers
				
				  (function() {
					var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
					ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
					var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
				  })();
				</script>';
	
	PageUtil::addVar("rawtext", $javascript);
}
?>