<?php

class Catalogo_admin_edithandler
{
    var $id;

    function initialize(&$pnRender)
    {
		
        $dom = ZLanguage::getModuleDomain('catalogo');
        $this->id = (int)FormUtil::getPassedValue('id', -1, 'GETPOST');

        $pnRender->caching = false;
        $pnRender->add_core_data();

        if(($this->id==-1) ) {
            $mode = 'create';
            $item = array('id'   => -1);
        } else {
            $mode = 'edit';
            $item = pnModAPIFunc('catalogo',
                                    'admin',
                                    'getItem',
                                    array('id' => $this->id));
            if ($item == false) {
                return LogUtil::registerError(__('Item desconocido', $dom), null, pnModURL('catalogo', 'admin', 'edit'));
            }
        }

        $pnRender->assign('mode', $mode);
        $pnRender->assign('item', $item);

        return true;
    }


    function handleCommand(&$pnRender, &$args)
    {
         $dom = ZLanguage::getModuleDomain('catalogo');
        // Security check
        if (!SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
            return LogUtil::registerPermissionError(pnModURL('catalogo', 'admin', 'edit'));
        }
        if ($args['commandName'] == 'submit') {
            $ok = $pnRender->pnFormIsValid();

            $data = $pnRender->pnFormGetValues();

            if(!$ok) {
                return false;
            }

            // The API function is called
                if(pnModAPIFunc('catalogo', 'admin', 'editItem', $data) <> false) {
                    // Success
                    LogUtil::registerStatus(__('Producto editado'));
                } else {
                    LogUtil::registerError(__('Error editando producto!'));
                }
        }
        return pnRedirect(pnModURL('catalogo', 'admin', 'main'));
    }

}