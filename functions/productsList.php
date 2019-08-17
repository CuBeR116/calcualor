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


//Подготовка класса и подключение стилей со скрипатми
$prepareCalc = new prepareCalc();
$APPLICATION = new APPLICATION();


$APPLICATION->includeJS('/js/jquery-3.4.1.min.js');
$APPLICATION->includeJS('/js/modal.js');
$APPLICATION->includeJS('/js/vue.js');
$APPLICATION->includeJS('/js/custom.js');

$APPLICATION->includeCSS('/css/bootstrap.min.css');
$APPLICATION->includeCSS('/css/template.css');

/**
 * Помощь по составлению продуктов
 ** Добавление товаров с помощью массива **
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

/**
 * Помощь по составлению продуктов
 ** Добавление товаров с помощью функции **
 * $prepareCalc->addProduct('Название', true/false); - Добавить новый товар. Если поставить false, скидки на товар не будет. Если true или пустой, то скидка будет
 * $prepareCalc->addPrice('Число') - Добавить цену на последний добавленный товар
 * $prepareCalc->addPhoto(string/array) - Добавить фотографию. Можно передать строку, где находится фотография, или массив с фотографиями. Функция проверяет на существование фотографии по переданному пути, и если находит, то добавляет в объект товара
 * $prepareCalc->addPhotosFromPath(string) - Добавить фотографии из папки. Ищет все файлы с расширениями .png/.gif/.jpg
 * $prepareCalc->addDescription(string/array) - Добавить описание для товара. Можно передать строку или массив
 * $prepareCalc->addOption('Название', 'Цена', 'Тип', 'После какой опции отобразить опцию') - Добавляет новую опцию по заданным правилам. Тип и родительскую опцию можно не передавать, достаточно название и цену.
 * * Типы для опции:
 * *** default - Обычный checkbox
 * *** text - Добавляет текстовое поле
 * *** count - Добавляет возможность выбирать количество товара
 */


//Список товаров
/*
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


$prepareCalc->arProduct = $arProduct;
*/

/* Гармония 1290*900 */
//После функции addProduct, начинается наполнение этого товара, а старый прекращается
$prepareCalc->addProduct('Кровать серии ГАРМОНИЯ 1690*900');

$prepareCalc->addPrice(13200);
$prepareCalc->addPhoto('/images/garmony/garmony-1.jpg'); // Добавить только 1 фото
// Добавить сразу несколько фотографии
$prepareCalc->addPhoto([
    '/images/garmony/garmony-2.jpg',
    '/images/garmony/garmony-3.jpg',
    '/images/garmony/garmony-4.jpg',
    '/images/garmony/garmony-5.jpg',
    '/images/garmony/garmony-6.jpg',
    '/images/garmony/garmony-7.jpg',
    '/images/garmony/garmony-8.jpg',
    '/images/garmony/garmony-9.jpg',
  ]
);

// Добавить описание для товара
$prepareCalc->addDescription('кровать - (Д*Ш*В) 1690*860*895;');
$prepareCalc->addDescription([
  'спальное место 1600*800;',
  'максимальный вес нагрузки - 150 кг.',
]);

$prepareCalc->addOption('Детский ортопедический матрас', 3700);
$prepareCalc->addOption('Наматрасник', 2000);
$prepareCalc->addOption('Стёганый наматрасник', 3000);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1300);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 1800, 'text');

/* Конец Гармония 1290*900 */

/* Кровать серии ГАРМОНИЯ 1790*860 */
$prepareCalc->addProduct('Кровать серии ГАРМОНИЯ 1790*860');
$prepareCalc->addPrice(14200);

$prepareCalc->addPhoto([
    '/images/garmony/garmony-1.jpg',
    '/images/garmony/garmony-2.jpg',
    '/images/garmony/garmony-3.jpg',
    '/images/garmony/garmony-4.jpg',
    '/images/garmony/garmony-5.jpg',
    '/images/garmony/garmony-6.jpg',
    '/images/garmony/garmony-7.jpg',
    '/images/garmony/garmony-8.jpg',
    '/images/garmony/garmony-9.jpg',
  ]
);

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1790*860*895;');
$prepareCalc->addDescription('спальное место 1700*800;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4000);
$prepareCalc->addOption('Наматрасник', 2200);
$prepareCalc->addOption('Стёганый наматрасник', 3200);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1400);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 1900, 'text');

/* Конец Кровать серии ГАРМОНИЯ 1790*860 */

/* Кровать серии ГАРМОНИЯ 1890*860 */
$prepareCalc->addProduct('Кровать серии ГАРМОНИЯ 1890*860');
$prepareCalc->addPrice(15200);

$prepareCalc->addPhoto([
    '/images/garmony/garmony-1.jpg',
    '/images/garmony/garmony-2.jpg',
    '/images/garmony/garmony-3.jpg',
    '/images/garmony/garmony-4.jpg',
    '/images/garmony/garmony-5.jpg',
    '/images/garmony/garmony-6.jpg',
    '/images/garmony/garmony-7.jpg',
    '/images/garmony/garmony-8.jpg',
    '/images/garmony/garmony-9.jpg',
  ]
);

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1890*860*945;');
$prepareCalc->addDescription('спальное место 1800*800;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4200);
$prepareCalc->addOption('Наматрасник', 2400);
$prepareCalc->addOption('Стёганый наматрасник', 3400);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1500);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 2000, 'text');

/* Конец Кровать серии ГАРМОНИЯ 1890*860 */

/* Кровать серии СПОРТ 1690*860 */
$prepareCalc->addProduct('Кровать серии СПОРТ 1690*860');
$prepareCalc->addPrice(15200);

$prepareCalc->addPhotosFromPath('/images/sport/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1690*860*790;');
$prepareCalc->addDescription('спальное место 1600*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 3700);
$prepareCalc->addOption('Наматрасник', 2300);
$prepareCalc->addOption('Стёганый наматрасник', 3400);
$prepareCalc->addOption('Однотонный наматрасник', 2000);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1300);
$prepareCalc->addOption('Именной бортик', 1800, 'text');

/* Конец Кровать серии СПОРТ 1690*860 */

/* Кровать серии СПОРТ 1790*860 */
$prepareCalc->addProduct('Кровать серии СПОРТ 1790*860');
$prepareCalc->addPrice(16200);

$prepareCalc->addPhotosFromPath('/images/sport/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1790*860*790;');
$prepareCalc->addDescription('спальное место 1700*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4000);
$prepareCalc->addOption('Наматрасник', 2600);
$prepareCalc->addOption('Однотонный наматрасник', 2200);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1400);
$prepareCalc->addOption('Именной бортик', 1900, 'text');

/* Конец Кровать серии СПОРТ 1790*860 */

/* Кровать серии СПОРТ 1890*860 */
$prepareCalc->addProduct('Кровать серии СПОРТ 1890*860');
$prepareCalc->addPrice(17200);

$prepareCalc->addPhotosFromPath('/images/sport/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1890*860*815;');
$prepareCalc->addDescription('спальное место 1800*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4200);
$prepareCalc->addOption('Наматрасник', 2900);
$prepareCalc->addOption('Однотонный наматрасник', 2400);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1500);
$prepareCalc->addOption('Именной бортик', 2000, 'text');

/* Конец Кровать серии СПОРТ 1890*860 */

/* Кровать серии ИЛЛЮЗИЯ 1890*860 */
$prepareCalc->addProduct('Кровать серии ИЛЛЮЗИЯ 1690*860');
$prepareCalc->addPrice(15200);

$prepareCalc->addPhotosFromPath('/images/illusion/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1690*860*895;');
$prepareCalc->addDescription('спальное место 1600*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 3700);
$prepareCalc->addOption('Наматрасник', 2000);
$prepareCalc->addOption('Стёганый наматрасник', 3000);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1300);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 1800, 'text');

/* Конец Кровать серии ИЛЛЮЗИЯ 1890*860 */

/* Кровать серии ИЛЛЮЗИЯ 1790*860 */
$prepareCalc->addProduct('Кровать серии ИЛЛЮЗИЯ 1690*860');
$prepareCalc->addPrice(16200);

$prepareCalc->addPhotosFromPath('/images/illusion/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1790*860*895;');
$prepareCalc->addDescription('спальное место 1700*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4000);
$prepareCalc->addOption('Наматрасник', 2200);
$prepareCalc->addOption('Стёганый наматрасник', 3200);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1400);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 1900, 'text');

/* Конец Кровать серии ИЛЛЮЗИЯ 1790*860 */

/* Кровать серии ИЛЛЮЗИЯ 1890*860 */
$prepareCalc->addProduct('Кровать серии ИЛЛЮЗИЯ 1890*860');
$prepareCalc->addPrice(17200);

$prepareCalc->addPhotosFromPath('/images/illusion/');

$prepareCalc->addDescription('кровать - (Д*Ш*В) 1890*860*945;');
$prepareCalc->addDescription('спальное место 1800*800;');
$prepareCalc->addDescription('два бельевых ящика 800*590*166;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас', 4200);
$prepareCalc->addOption('Наматрасник', 2400);
$prepareCalc->addOption('Стёганый наматрасник', 3400);
$prepareCalc->addOption('Подушка (400х700)', 900, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1500);
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на подушке', 150, 'default', 'Подушка (400х700)');
$prepareCalc->addOption('Именной бортик', 2000, 'text');

/* Конец Кровать серии ИЛЛЮЗИЯ 1890*860 */

/* Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1780*850 */
$prepareCalc->addProduct('Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1780*850');
$prepareCalc->addPrice(17200);

$prepareCalc->addPhotosFromPath('/images/illusion_with/');

$prepareCalc->addDescription('кровать - (Д*Ш) 1780*850;');
$prepareCalc->addDescription('нижнее спальное место 1680*850;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас 1700*800', 4000);
$prepareCalc->addOption('Детский ортопедический матрас 1600*800', 3700);
$prepareCalc->addOption('Наматрасник 1700*800', 2200);
$prepareCalc->addOption('Наматрасник 1600*800', 2000);
$prepareCalc->addOption('Стёганый наматрасник', 3200);
$prepareCalc->addOption('Подушка (400х700) 2шт', 1800, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1400);
$prepareCalc->addOption('Именной бортик', 1900, 'text');
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на выдвижном ящике', 1000);
$prepareCalc->addOption('Стразы на подушках', 300, 'default', 'Подушка (400х700)');

/* Конец Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1780*850 */

/* Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1880*850 */
$prepareCalc->addProduct('Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1880*850');
$prepareCalc->addPrice(17200);

$prepareCalc->addPhotosFromPath('/images/illusion_with/');

$prepareCalc->addDescription('кровать - (Д*Ш) 1880*850;');
$prepareCalc->addDescription('нижнее спальное место 1780*850;');
$prepareCalc->addDescription('максимальный вес нагрузки - 150 кг.');

$prepareCalc->addOption('Детский ортопедический матрас 1800*800', 4200);
$prepareCalc->addOption('Детский ортопедический матрас 1700*800', 4000);
$prepareCalc->addOption('Наматрасник 1800*800', 2400);
$prepareCalc->addOption('Наматрасник 1700*800', 2200);
$prepareCalc->addOption('Стёганый наматрасник', 3400);
$prepareCalc->addOption('Подушка (400х700) 2шт', 1800, 'count');
$prepareCalc->addOption('Однотонный бортик (без наклеек)', 1500);
$prepareCalc->addOption('Именной бортик', 2000, 'text');
$prepareCalc->addOption('Стразы на спинке кровати', 1500);
$prepareCalc->addOption('Стразы на выдвижном ящике', 1000);
$prepareCalc->addOption('Стразы на подушках', 300, 'default', 'Подушка (400х700)');

/* Конец Кровать серия ИЛЛЮЗИЯ с выдвижным ящиком или дополнительным спальным местом 1880*850 */

/* Пуфик 40*50 */
$prepareCalc->addProduct('Ящик-пуфик 40*50', false);
$prepareCalc->addPrice(4900);

$prepareCalc->addPhotosFromPath('/images/pufic/');

$prepareCalc->addDescription('Размер 40х50х43;');
$prepareCalc->addDescription('Корона + надпись Princess или Prince.');

$prepareCalc->addOption('Имя', 500, 'text');
$prepareCalc->addOption('Стразы', 700);

/* Конец Пуфик 40*50 */


/* Ящик-пуфик 40*80 */
$prepareCalc->addProduct('Ящик-пуфик 40*80', false);
$prepareCalc->addPrice(5900);

$prepareCalc->addPhotosFromPath('/images/pufic/');

$prepareCalc->addDescription('Размер 40х80х43;');
$prepareCalc->addDescription('Корона + надпись Princess или Prince.');

$prepareCalc->addOption('Имя', 500, 'text');
$prepareCalc->addOption('Стразы', 700);

/* Конец Пуфик 40*50 */