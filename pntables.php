<?php
/**
 * Formicula - the contact mailer for Zikula
 * -----------------------------------------
 *
 * @copyright  (c) Formicula Development Team
 * @link       http://code.zikula.org/formicula 
 * @version    $Id: pntables.php 132 2008-12-28 13:47:33Z Landseer $
 * @license    GNU/GPL - http://www.gnu.org/copyleft/gpl.html
 * @author     Frank Schummertz <frank@zikula.org>
 * @package    Third_Party_Components
 * @subpackage formicula
 */

function catalogo_pntables()
{
    // Initialise table array
    $pntable = array();

    // Get the name for the template item table.  This is not necessary
    // but helps in the following statements and keeps them readable
    $pntable['catalogo'] = DBUtil::getLimitedTablename('catalogo');

    // Set the column names.  Note that the array has been formatted
    // on-screen to be very easy to read by a user.
    $pntable['catalogo_column'] = array('id'              => 'pn_id',
                                        'name'            => 'pn_name',
                                        'shortname'       => 'pn_shortname',
										'description'     => 'pn_description',
										'longDescription' => 'pn_longdescription',
                                        'code'            => 'pn_code',
										'price'           => 'pn_price',
										'cat'             => 'pn_cat',
                                        'size'            => 'pn_size',
                                        'content'         => 'pn_content');

    $pntable['catalogo_column_def'] = array('id'              => "I AUTO PRIMARY",
                                            'name'            => "C(52) NOTNULL DEFAULT ''",
                                            'shortname'       => "C(52) NOTNULL DEFAULT ''",
											'description'     => "C(52) NOTNULL DEFAULT ''",
											'longDescription' => "C(154) NOTNULL DEFAULT ''",
                                            'code'            => "C(30) NOTNULL DEFAULT ''",
											'price'           => "C(30) NOTNULL DEFAULT ''",
											'cat'             => "C(40) NOTNULL",
                                            'size'            => "C(30) NOTNULL DEFAULT ''",
                                            'content'         => "X NOTNULL");
									
	 $pntable['catalogo_people'] = DBUtil::getLimitedTablename('catalogo_people');

    // Set the column names.  Note that the array has been formatted
    // on-screen to be very easy to read by a user.
    $pntable['catalogo_people_column'] = array('id'       => 'pn_id',
                                        'name'            => 'pn_name',
                                        'tel'             => 'pn_tel',
										'mail'            => 'pn_mail',
										'cotizacion'      => 'pn_cotizacion');

    $pntable['catalogo_people_column_def'] = array('id'       => "I AUTO PRIMARY",
                                            'name'            => "C(30) NOTNULL DEFAULT ''",
                                            'tel'    	      => "C(30) NOTNULL DEFAULT ''",
											'mail'            => "C(30) NOTNULL DEFAULT ''",
											'cotizacion'      => "XL NOTNULL");
											
	
	$pntable['catalogo_pedidos'] = DBUtil::getLimitedTablename('catalogo_pedidos');

    // Set the column names.  Note that the array has been formatted
    // on-screen to be very easy to read by a user.
    $pntable['catalogo_pedidos_column'] = array('id'       => 'pn_id',
                                        'name'            => 'pn_name',
                                        'tel'             => 'pn_tel',
										'mail'            => 'pn_mail',
										'address'         => 'pn_address',
										'city'            => 'pn_city',
										'state'           => 'pn_state',
										'postcode'        => 'pn_postcode',
										'notes'           => 'pn_notes',
										'subtotal'        => 'pn_subtotal',
										'shipping'        => 'pn_shipping',
										'total'           => 'pn_total',
										'cotizacion'      => 'pn_cotizacion');

    $pntable['catalogo_pedidos_column_def'] = array('id'       => "I AUTO PRIMARY",
                                            'name'            => "C(30) NOTNULL DEFAULT ''",
                                            'tel'    	      => "C(30) NOTNULL DEFAULT ''",
											'mail'            => "C(30) NOTNULL DEFAULT ''",
											'address'         => "C(150) NOTNULL DEFAULT ''",
											'city'            => "C(30) NOTNULL DEFAULT ''",
											'state'           => "C(30) NOTNULL DEFAULT ''",
											'postcode'        => "C(6) NOTNULL DEFAULT ''",
											'notes'           => "X NOTNULL",
											'subtotal'        => "F NOTNULL",
											'shipping'        => "F NOTNULL",
											'total'           => "F NOTNULL",
											'cotizacion'      => "XL NOTNULL");

    // Return the table information
    return $pntable;
}
