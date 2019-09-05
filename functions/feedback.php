<?php

$phone = $_POST['personal']['calc-modal-phone'];
$email = $_POST['personal']['calc-modal-email'];
$name = $_POST['personal']['calc-modal-name'];
$city = $_POST['personal']['calc-modal-city'];


$data = '';
$n = 0;
for ($n = 0; $n <= 1000; $n++) {
  if(!$_POST['products']['itemName_' . $n])
    break;
  
  $data .= '<div>' . $_POST['products']['itemName_' . $n] . '</div>';
  $data .= '<div>' . 'Цена - ' . $_POST['products']['itemPrice_' . $n] . ' руб.</div>>';
  $data .= '<div>' . 'Количество - ' . $_POST['products']['itemQuantity_' . $n] . ' шт</div>';
}

$data .= '<div>' . 'Общая цена - ' . $_POST['products']['sum'] . '</div>';

$text = '<html>
    <head>
        <title>Заказ на кровать</title>
    </head>
    <body>
		<div>Имя: ' . $name . '</div>
		<div>Почта: ' . $email . '</div>
		<div>Номер телефона: ' . $phone . '</div>
		<div>Город: ' . $city . '</div>
		<div>Комплектация:</div>' . $data . '
    </body>
</html>';
$subj = 'Заявка мастеру';

$to1 = "<dardav.mebel@yandex.ru>, <imadex@yandex.ru>";
$from = "<dardav@imdx.ru>";

$boundary = strtoupper(uniqid(time()));
$head = "From: " . $from . "\n";
if ($reply != "") {
  $head .= "Reply-To: " . $reply . "\n";
}
$head .= "X-Mailer: PHPMail Tool\n";
$head .= "MIME-Version: 1.0;\n";
$head .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\n";
$body = "--" . $boundary . "\n";
$body .= "Content-Type: text/html; charset=utf-8\n";
$body .= "Content-Transfer-Encoding: base64\n\n" . chunk_split(base64_encode($text)) . "\n";
$body .= "--" . $boundary . "--\n";
mail($to1,"=?UTF-8?B?".base64_encode($subj)."?=", $body, $head);
echo json_encode([
  'result'  => 'success',
  'test'    => $text,
  'POST' => $_POST,
  'request' => $_REQUEST,
  'message' => "Ваша заявка отправлена.\nНаши менеджеры с Вами свяжутся",
]);
?>