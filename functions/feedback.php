<?php

$phone = $_REQUEST['phone'];
$email = $_REQUEST['email'];
$name = $_REQUEST['name'];
$city = $_REQUEST['city'];

$data_arr = explode(';',$_REQUEST['data']);
$data = '';
foreach ($data_arr as $value){
  if (trim($value)!='') $data .= '<div>  - '.$value.';</div>';
}

$text = '<html>
    <head>
        <title>Заказ на кровать</title>
    </head>
    <body>
		<div>Имя: '.$name.'</div>
		<div>Почта: '.$email.'</div>
		<div>Номер телефона: '.$phone.'</div>
		<div>Город: '.$city.'</div>
		<div>Комплектация:</div>' .$data.'
		<div>Количество: '.$_REQUEST['num'].'шт.</div>
		<div>Цена: '.$_REQUEST['price'].'руб.</div>
    </body>
</html>';
$subj = 'Заявка мастеру';

$to1  = "<dardav.mebel@yandex.ru>, <imadex@yandex.ru>";
$from = "<dardav@imdx.ru>";

$boundary = strtoupper(uniqid(time()));
$head = "From: ".$from."\n";
if ($reply!="") {$head .= "Reply-To: ".$reply."\n";}
$head .= "X-Mailer: PHPMail Tool\n";
$head .= "MIME-Version: 1.0;\n";
$head .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\n";
$body = "--".$boundary."\n";
$body .= "Content-Type: text/html; charset=utf-8\n";
$body .= "Content-Transfer-Encoding: base64\n\n".chunk_split(base64_encode($text))."\n";
$body .="--".$boundary."--\n";
mail($to1,"=?UTF-8?B?".base64_encode($subj)."?=", $body, $head);
echo json_encode([
  'result' => 'success',
  'message' => "Ваша заявка отправлена.\nНаши менеджеры с Вами свяжутся"
]);
?>