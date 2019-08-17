<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/functions/productsList.php';
ob_clean();
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

$_POST = json_decode(file_get_contents('php://input'), true);

echo $prepareCalc->getProductJSON($_POST['key']);
