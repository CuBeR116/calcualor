<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 03.06.2019
 * Time: 8:50
 * Mail: cuber116@gmail.com
 */

class prepareCalc
{
  public $arProduct;
  
  public function __construct()
  {
    $this->lastAdded = '';
  }
  
  public function getProductJSON($name)
  {
    $arList = array();
    
    foreach ($this->arProduct as $keyProduct => $arProduct) {
      $arList[$keyProduct] = array(
        'NAME'            => $arProduct['NAME'],
        'PREVIEW_PICTURE' => is_array($arProduct['PHOTOS']) ? array_shift($arProduct['PHOTOS']) : NULL,
      );
    }
    
    $this->arProduct[$name]['PHOTOS'] = array_values($this->arProduct[$name]['PHOTOS']);
    $this->arProduct[$name]['PHOTO'] = reset($this->arProduct[$name]['PHOTOS']);
    $this->arProduct[$name]['OPTIONS']['BASE'] = array(
      'TYPE'  => 'basic',
      'PRICE' => $this->arProduct[$name]['PRICE'],
      'NAME'  => $this->arProduct[$name]['NAME'],
    );
    return json_encode($this->arProduct[$name] + array('LIST' => $arList));
  }
  
  public function activeProduct()
  {
  
  }
  
  public function prepareProducts()
  {
  
  }
  
  public function addProduct($name, $discount = true)
  {
    $this->arProduct[$name] = array(
      'NAME' => $name
    );
    $this->lastAdded = $name;
    
    if($discount === false) {
      $this->arProduct[$name]['DISCOUNT'] = false;
    }
    return $this;
  }
  
  public function addPrice($price)
  {
    $this->arProduct[$this->lastAdded]['PRICE'] = $price;
    return $this;
  }
  
  public function addPhoto($path)
  {
    if (is_array($path)) {
      foreach ($path as $valPhoto) {
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . $valPhoto)) {
          $this->arProduct[$this->lastAdded]['PHOTOS'][$valPhoto] = $valPhoto;
        }
      }
    } else {
      if (file_exists($_SERVER['DOCUMENT_ROOT'] . $path)) {
        $this->arProduct[$this->lastAdded]['PHOTOS'][$path] = $path;
      }
    }
  }
  
  public function addDescription($description)
  {
    if (is_array($description)) {
      foreach ($description as $valDescription) {
        $this->arProduct[$this->lastAdded]['DESCRIPTION'][] = $valDescription;
      }
    } else {
      $this->arProduct[$this->lastAdded]['DESCRIPTION'][] = $description;
    }
  }
  
  public function addOption($name, $price, $type = 'default', $after = NULL) {
    $this->arProduct[$this->lastAdded]['OPTIONS'][$name] = array(
      'NAME' => $name,
      'PRICE' => $price,
      'TYPE' => $type,
    );
    
    if($after !== NULL) {
      $this->arProduct[$this->lastAdded]['OPTIONS'][$after]['CHILD'] = $name;
      $this->arProduct[$this->lastAdded]['OPTIONS'][$name]['AFTER'] = $after;
    }
  }
  public function addPhotosFromPath($path) {
    if(file_exists($_SERVER['DOCUMENT_ROOT'] . $path)) {
      foreach (glob($_SERVER['DOCUMENT_ROOT'] . $path."*.{jpg,png,gif}", GLOB_BRACE) as $filename) {
        $fileInfo = pathinfo($filename);
        $this->arProduct[$this->lastAdded]['PHOTOS'][$path . $fileInfo['basename']] = $path . $fileInfo['basename'];
      }
    }
  }
}


function debug($array)
{
  echo '<pre>';
  print_r($array);
  echo '</pre>';
}