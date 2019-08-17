<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 07.06.2019
 * Time: 0:30
 */

if($_SERVER['REQUEST_METHOD'] !== 'POST') die();

ob_clean();
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

require_once __DIR__ . '/productsList.php';

echo $prepareCalc->getProductJSON(str_replace('_', ' ', $_POST['key']));
