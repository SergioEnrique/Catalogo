<?php

function catalogo_adminapi_getItem($args)
{
    $dom = ZLanguage::getModuleDomain('catalogo');
    if (!isset($args['id']) || empty($args['id'])) {
        return LogUtil::registerArgsError();
    }

    $item = DBUtil::selectObjectByID('catalogo', $args['id'], 'id');
    return $item;
}

function catalogo_adminapi_createItem($args)
{
    $dom = ZLanguage::getModuleDomain('catalogo');

    if ((!isset($args['name'])) || (!isset($args['shortname']))) {
        return LogUtil::registerArgsError();
    }

    $obj = DBUtil::insertObject($args, 'catalogo', 'id');
    if($obj == false) {
        return LogUtil::registerError(__('¡Error! Intento fallido en la creación del producto.', $dom));
    }
    pnModCallHooks('item', 'create', $obj['id']);
    return $obj['id'];
}

function catalogo_adminapi_editItem($args)
{
    $dom = ZLanguage::getModuleDomain('catalogo');

    if ((!isset($args['name'])) || (!isset($args['shortname']))) {
        return LogUtil::registerArgsError();
    }

	$res = DBUtil::updateObject($args, 'catalogo');
    if($res == false) {
        return LogUtil::registerError(_MH__('¡Error! Intento fallido en la edición del producto', $dom));
    }
    pnModCallHooks('item', 'update', $args['id']);
    return $args['id'];
}


/**
 * get available admin panel links
 *
 * @author Mark West
 * @return array array of admin links
 */
function catalogo_adminapi_getlinks()
{
    $dom = ZLanguage::getModuleDomain('catalogo');
    $links = array();
    if (SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
        $links[] = array('url' => pnModURL('catalogo', 'admin', 'edit'), 'text' => __('Nuevo Producto', $dom));
    }
    return $links;
}