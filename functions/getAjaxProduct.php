<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 07.06.2019
 * Time: 0:30
 * Mail: cuber116@gmail.com
 */

if($_SERVER['REQUEST_METHOD'] !== 'POST') die();


require_once __DIR__ . '/productsList.php';

echo $prepareCalc->getProductJSON(str_replace('_', ' ', $_POST['key']));



?>