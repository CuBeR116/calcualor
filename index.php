<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 01.06.2019
 * Time: 17:38
 */

require_once $_SERVER['DOCUMENT_ROOT'] . '/functions/productsList.php';

$APPLICATION->echoIncludedCSS();
?>
  <div id="calculator"></div>
  <script src="/dist/build.js"></script>

<?php
$APPLICATION->includeFile('/template/modal.php');
$APPLICATION->echoIncludedJS();
?>