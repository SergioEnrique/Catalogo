<?php

class Catalogo_user_chekouthandler
{
    var $id;

    function initialize(&$pnRender)
    {
		
        $dom = ZLanguage::getModuleDomain('catalogo');
        $this->id = (int)FormUtil::getPassedValue('id', -1, 'GETPOST');

        $pnRender->caching = false;
        $pnRender->add_core_data();


        return true;
    }


    function handleCommand(&$pnRender, &$args)
    {
         $dom = ZLanguage::getModuleDomain('catalogo');
        // Security check

        if ($args['commandName'] == 'submit') {
            $ok = $pnRender->pnFormIsValid();

            $data = $pnRender->pnFormGetValues();
            if(!$ok) {
                return false;
            }
			
			$cotizacionProcesada = pnModAPIFunc('catalogo', 'user', 'procesarCotizacion', $data);
			
			// The API function is called
			if($cotizacionProcesada != false) {
				// Success
				SessionUtil::setVar('cotizacionProcesada',$cotizacionProcesada);
				LogUtil::registerStatus(__('Cotización recibida correctamente en Agarti. Pronto nos pondremos en contacto para facilitarte las formas de pago y responder tus dudas.'));
			} else {
				LogUtil::registerError(__('¡No hemos recibido la cotización! Por favor inténtalo nuevamente o solicita la cotización directamente por el formulario de contacto, al correo ventas@agarti.com.mx o al teléfono 01 800 713 4657'));
				return pnRedirect('http://www.agarti.com.mx/contenidos/contactenos');
			}

        }//if
        return pnRedirect(pnModURL('catalogo', 'user', 'cotizacionsatisfactoria'));
    }//function handleCommand

}//class