<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 03.06.2019
 * Time: 9:19
 * Mail: cuber116@gmail.com
 */

class APPLICATION
{
  public $arJSFiles;
  public $arCSSFiles;
  
  public function includeJS($file) {
    $JSFile = $_SERVER['DOCUMENT_ROOT'] . $file;
    if(file_exists($JSFile)) {
      $this->arJSFiles[$file] = $file;
    }
  }
  
  public function includeCSS($file) {
    $CSSFile = $_SERVER['DOCUMENT_ROOT'] . $file;
    if(file_exists($CSSFile)) {
      $this->arCSSFiles[$file] = $file;
    }
  }
  
  public function echoIncludedJS() {
    foreach ($this->arJSFiles as $JS) {
      echo '<script src="' . $JS . '"></script>';
    }
  }
  public function echoIncludedCSS() {
    foreach ($this->arCSSFiles as $CSS) {
      echo '<link rel="stylesheet" href="' . $CSS . '">';
    }
  }
  public function includeFile($name) {
    $file = $_SERVER['DOCUMENT_ROOT'] . $name;
    if(file_exists($file)) {
      require_once $file;
    }
    else {
      return false;
    }
  }
}