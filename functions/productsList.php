<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 03.06.2019
 * Time: 8:54
 * Mail: cuber116@gmail.com
 */

require_once __DIR__ . '/prepareCalc.php';
require_once __DIR__ . '/APPLICATION.php';

/**
 * Помощь по составлению продуктов
 * Ключ 'NAME' будет идти как название, которое будет подставляться везде
 * Ключ 'PRICE' цена
 * 'PHOTOS' - здесь хранится массив с фотографиями
 * 'OPTIONS' - Опции, которые присутствуют у товара
 * 'OPTIONS' - Внутри опции имеется 4 дополнительных аттрибута
 * 'OPTIONS' -> 'NAME' - Название, которое будет подставляться. Если пустой, будет брать название по умолчанию
 * 'OPTIONS' -> 'PRICE' - Цена
 * 'OPTIONS' -> 'TYPE' - Тип опции, который будет использоваться
 * 'OPTIONS' -> 'AFTER' -> После выбора какого аттрибиута отображать
 */

$arProduct['Гармония 1690*860'] = [
  'NAME'    => 'Кровать серии ГАРМОНИЯ 1690*860',
  'PRICE'   => 13200,
  'DESCRIPTION' => [
    'размер кровати 1690*860;',
    'два бельевых ящика 800*590*166;',
    'максимальный вес нагрузки - 150 кг.'
  ],
  'PHOTOS'  => [
    '/images/garmony/garmony-1.jpg',
    '/images/garmony/garmony-2.jpg',
    '/images/garmony/garmony-3.jpg',
    '/images/garmony/garmony-4.jpg',
    '/images/garmony/garmony-5.jpg',
    '/images/garmony/garmony-6.jpg',
    '/images/garmony/garmony-7.jpg',
    '/images/garmony/garmony-8.jpg',
    '/images/garmony/garmony-9.jpg',
  ],
  'OPTIONS' => [
    'Детский ортопедический матрас' => [
      'NAME'  => 'Детский ортопедический матрас',
      'PRICE' => 3700,
    ],
    'Наматрасник' => [
      'NAME' => 'Наматрасник',
      'PRICE' => 2000,
    ],
    'Стёганный наматрасник' => [
      'NAME' => 'Стёганный наматрасник',
      'PRICE' => 2000,
    ],
    'Подушка' => [
      'NAME' => 'Подушка 400х700',
      'PRICE' => 900,
      'TYPE' => 'count'
    ],
    'Однотонный бортик без наклеек' => [
      'NAME' => 'Однотонный бортик без наклеек',
      'PRICE' => 1300,
    ],
    'Имя ребенка' => [
      'NAME' => 'Имя ребенка',
      'PRICE' => 1800,
      'TYPE' => 'text'
    ],
    'Стразы на подушке' => [
      'NAME' => 'Стразы на подушке',
      'PRICE' => 450,
      'AFTER' => 'Подушка'
    ]
  ],
];

$arProduct['Кровать серии ГАРМОНИЯ 1790*860'] = [
  'NAME' => 'Кровать серии ГАРМОНИЯ 1790*860',
  'PRICE'   => 15000,
  'DESCRIPTION' => [
    'размер кровати 1690*860;',
  ],
];

$prepareCalc = new prepareCalc();
$APPLICATION = new APPLICATION();


$APPLICATION->includeJS('/js/jquery-3.4.1.min.js');
$APPLICATION->includeJS('/js/template.js');

$APPLICATION->includeCSS('/css/bootstrap.min.css');
$APPLICATION->includeCSS('/css/template.css');


$prepareCalc->arProduct = $arProduct;