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

<div class="calc-block">
  <script>
    window.onload = function() {
      let calc1 = new Calc(<?= $prepareCalc->getProductJSON('Кровать серии ГАРМОНИЯ 1690*900'); ?>);
      
      calc1.init();
    };
  </script>
</div>

<?php
$APPLICATION->includeFile('/template/modal.php');
$APPLICATION->echoIncludedJS();
?>