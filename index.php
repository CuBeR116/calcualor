<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 01.06.2019
 * Time: 17:38
 * Mail: cuber116@gmail.com
 */

require_once $_SERVER['DOCUMENT_ROOT'] . '/functions/productsList.php';

$APPLICATION->echoIncludedCSS();
$APPLICATION->echoIncludedJS();

?>

<div class="calc-block">
  <script>
    Calc.calcRender(<?= $prepareCalc->getProductJSON('Гармония 1690*860'); ?>)
  </script>
</div>
