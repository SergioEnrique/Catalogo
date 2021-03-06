<?php
/**
 * Zikula Application Framework
 *
 * @copyright (c) 2001, Zikula Development Team
 * @link http://www.zikula.org
 * @version $Id: pnadmin.php 31 2008-12-23 20:55:41Z Guite $
 * @license GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */
 
function catalogo_admin_main()
{
    if (!SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
        return LogUtil::registerPermissionError();
    }
	
	// Obtener los datos de todos los productos de la categoría seleccionada.
	$dats = array();
	$pntable = pnDBGetTables();
    $catalogo = $pntable['catalogo_column'];
	$orderBy = "ORDER BY $catalogo[code]";
    $dats = DBUtil::selectObjectArray ('catalogo', '', $orderBy);
	
	// Renderizando...
    $pnRender = pnRender::getInstance('catalogo');
	
	$pnRender->assign('dats', $dats);
	
    return $pnRender->fetch('catalogo_admin_main.htm');
}

function catalogo_admin_add()
{
    if (!SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
        return LogUtil::registerPermissionError();
    }
	
	Loader::requireOnce('modules/catalogo/pnincludes/catalogo_admin_addhandler.class.php');
	
    // Create output object
    $pnf = FormUtil::newpnForm('catalogo');
	
	// Return the output that has been generated by this function
	return $pnf->pnFormExecute('catalogo_admin_add.htm', new Catalogo_main_addhandler());
}

function catalogo_admin_edit()
{
    if (!SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
        return LogUtil::registerPermissionError();
    }
	
	Loader::requireOnce('modules/catalogo/pnincludes/catalogo_admin_edithandler.class.php');
	
    // Create output object
    $pnf = FormUtil::newpnForm('catalogo');

	// return $pnf->fetch('catalogo_admin_main.htm');
	
	// Return the output that has been generated by this function
	return $pnf->pnFormExecute('catalogo_admin_edit.htm', new Catalogo_admin_edithandler());
}
