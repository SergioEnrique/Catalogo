<?php
/**
 * Zikula Application Framework
 *
 * @copyright (c) 2001, Zikula Development Team
 * @link http://www.zikula.org
 * @version $Id: pninit.php 31 2008-12-23 20:55:41Z Guite $
 * @license GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 */

function catalogo_init()
{
    pnModSetVar('catalogo', 'modulestylesheet', 'catalogo.css');
    return true;
}

function catalogo_upgrade($oldversion)
{
    return true;
}

function catalogo_delete()
{
    pnModDelVar('catalogo');
    return true;
}
