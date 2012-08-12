<?php
/**
 * Formicula - the contact mailer for Zikula
 * -----------------------------------------
 *
 * @copyright  (c) Formicula Development Team
 * @link       http://code.zikula.org/formicula
 * @version    $Id: pnversion.php 131 2008-12-28 13:34:07Z Landseer $
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 * @author     Frank Schummertz <frank@zikula.org>
 * @package    Third_Party_Components
 * @subpackage formicula
 */

class Catalogo_admin_addhandler
{
    var $cid;

    function initialize(&$pnRender)
    {
		
        $pnRender->caching = false;
        $pnRender->add_core_data();
		
        return true;
    }


    function handleCommand(&$pnRender, &$args)
    {
        // $dom = ZLanguage::getModuleDomain('formicula');
        // Security check
        if (!SecurityUtil::checkPermission('catalogo::', '::', ACCESS_ADMIN)) {
            return LogUtil::registerPermissionError(pnModURL('catalogo', 'admin', 'add'));
        }
        if ($args['commandName'] == 'submit') {
            $ok = $pnRender->pnFormIsValid();

            $data = $pnRender->pnFormGetValues();

            if(!$ok) {
                return false;
            }

            // The API function is called
                if(pnModAPIFunc('catalogo', 'admin', 'createItem', $data) <> false) {
                    // Success
                    LogUtil::registerStatus(__('Producto añadido'));
                } else {
                    LogUtil::registerError(__('Error añadiendo producto!'));
                }
        }
        return pnRedirect(pnModURL('catalogo', 'admin', 'add'));
    }

}