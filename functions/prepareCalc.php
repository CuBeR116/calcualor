<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 03.06.2019
 * Time: 8:50
 * Mail: cuber116@gmail.com
 */

class prepareCalc {
  public $arProduct;
  
  public function getProductJSON($name) {
    $arList = [];
    
    foreach ($this->arProduct as $keyProduct => $arProduct) {
      $arList[$keyProduct] = [
        'NAME' => $arProduct['NAME'],
        'PREVIEW_PICTURE' => $arProduct['PHOTOS'][0],
      ];
    }
    $this->arProduct[$name]['OPTIONS']['BASE'] = [
      'TYPE' => 'basic',
      'PRICE' => $this->arProduct[$name]['PRICE'],
      'NAME' => $this->arProduct[$name]['NAME'],
    ];
    return json_encode($this->arProduct[$name] + ['LIST' => $arList]);
  }
  
  public function activeProduct() {
  
  }
  
  public function prepareProducts() {
  
  }
}



function debug($array) {
  echo '<pre>';
  print_r($array);
  echo '</pre>';
}