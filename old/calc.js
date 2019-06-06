calcData = {
	//Для Спорт и Иллюзия
	//1-Цена
	//2-детский ортопедический матрас
	//3-наматрасник с полосками
	//4-наматрасник однотонный
	//5-подушки
	//6-бортик однотонный
	//7-бортик именной
	//8-стразы на спинке
	//9-стразы на подушке
	//10-стеганый наматрасник

	//Для Иллюзия с ящиком
	//1-Цена
	//2-Детский ортопедический матрас большой
	//3-Детский ортопедический матрас маленький
	//4-наматрасник большой
	//5-наматрасник маленький
	//6-подушки
	//7-бортик однотонный
	//8-бортик именной
	//9-стразы на спинке
	//10-стразы на подушке
	//11-стразы на выдвижном ящике
	//12-стеганый наматрасник


	priceMatrix: [
	//Спорт Иллюзия
	//				    1     2    3    4   5   6    7    8    9   10
	/*1690х860х800*/ [15200,3700,2300,2000,900,1300,1800,1500,1800,3000],
	/*1790х860х800*/ [16200,4000,2600,2200,900,1400,1900,1500,1900,3200],
	/*1890х860х800*/ [17200,4200,2900,2400,900,1500,2000,1500,2000,3400],

	//Иллюзия с ящиком
	//				    1     2    3    4   5   6    7    8    9  10   11   12
					[17200,4000,3700,2200,2000,900,1400,1900,1500,150,1000,3200],
					[18200,4200,4000,2400,2200,900,1500,2000,1500,150,1000,3400],

	//Пуфики           1   2   3
					[4900,500,700],
					[5900,500,700],

					
//Кровать Гармония
/* 1690*860 */	[13200,3700,2000,3000,900,1300,1500,150,1800],
/* 1790*860 */  [14200,4000,2200,3200,900,1400,1500,150,1900],
/* 1890*860 */  [15200,4200,2400,3400,900,1500,1500,150,2000],
         
  		  [],
          [],
		],

	priceNum: [0,1,2,0,1,2,3,4,5,6,7,8,9],
	price: 0,
	firstSwitch: ''
}
function qs(css){return document.querySelector(css);}
function qsa(css){return document.querySelectorAll(css);}

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

document.addEventListener('DOMContentLoaded', function(){
	calcData.firstSwitch = qs('.calc-checkbox');

	var elem = qsa('div.mini-pictures img');
	for (var i = 0; i < elem.length; i++) {
		addEvent(elem[i], "click", selectImg );
	}

	elem = qsa('input.simple-radio');
	for (var i = 0; i < elem.length; i++) {
		elem[i].onchange = function(event) {
		  console.log('change');
			calcPrice();
		};
	}

	var elemIncSel = qsa('input.increment-field');
	for (var i = 0; i < elemIncSel.length; i++) {
		elemIncSel[i].onchange = function(event) {
			var changeElem = event.target.parentNode.nextElementSibling;
			if (event.target.checked==true){
				changeElem.style.opacity = '1';
			} else {
				changeElem.style.opacity = '0.3';
			}
			calcPrice();
		};
	}

	var elemBortik = qs('input[name="nameBortik"]');
	elemBortik.onchange = function(event) {
		var changeElem = qs('input[name="childName"]');
		if (elemBortik.checked==true){
			changeElem.parentNode.style.opacity = '1';
			changeElem.disabled = false;
		} else {
			changeElem.parentNode.style.opacity = '0.3';
			changeElem.disabled = true;
		}
		calcPrice();
	};

	var elemIncrement = qsa('div.calc-inc-butt');
	for (var i = 0; i < elemIncrement.length; i++) {
		elemIncrement[i].onclick = function(e) {
			var nameInput = e.target.parentNode.children[1].name;
			if((e.target.parentNode.parentNode.previousElementSibling.children[0].checked==true)|| (nameInput=='divanNum')){
				var selectDivan = qs('input[name="calc-size"]:checked');
				if(e.target.innerHTML=='+') {
					var value = +(e.target.previousElementSibling.value);
					// if (((selectDivan.dataset.num==7)||(selectDivan.dataset.num==8))&& (e.target.previousElementSibling.name=="podushkaNum")) e.target.previousElementSibling.value = value+2;
					// else
					e.target.previousElementSibling.value = value+1;
				} else {
					var value = +(e.target.nextElementSibling.value);
					// if (((selectDivan.dataset.num==7)||(selectDivan.dataset.num==8))&& (e.target.nextElementSibling.name=="podushkaNum"))
					// {
					// 	if ((value>0)&&(nameInput!='divanNum')) e.target.nextElementSibling.value = value-2;
					// 	if ((value>1)&&(nameInput=='divanNum')) e.target.nextElementSibling.value = value-2;
					// } else
					{
						if ((value>0)&&(nameInput!='divanNum')) e.target.nextElementSibling.value = value-1;
						if ((value>1)&&(nameInput=='divanNum')) e.target.nextElementSibling.value = value-1;
					}

				}
			}
			calcPrice();
		};
	}

	qs('.calc-choose-list').onclick = function(event) {
		qs('div.calc-select-wrap').classList.toggle("calc-open");
	};
	qs('.calc-ar-down').onclick = function(event) {
		qs('div.calc-select-wrap').classList.toggle("calc-open");
	};

	var elemSelect = qsa('input[name="calc-size"]');
	for (var i = 0; i < elemSelect.length; i++) {
		elemSelect[i].onclick =  function(e) {
			  var node = e.target;
			  while (!(node.classList.contains("calc-list"))) node = node.parentElement;
			  while (!(node.classList.contains("calc-choose-list"))) node = node.previousElementSibling;
			  node.classList.remove('calc-first');
			  node.classList.add('bold');
			  var elem = e.target.nextElementSibling.nextElementSibling;
			  node.innerHTML = elem.innerHTML;
			  while (!(node.classList.contains("calc-select-wrap"))) node = node.parentNode;
			  node.classList.remove('calc-open');

			  //Если текст не влазиит
			  if ((e.target.value==2)||(e.target.value==3)) {
				  node.children[1].classList.remove("middle-text");
				  node.children[1].classList.add("little-text");
			  } else if ((e.target.value==1)) {
				  node.children[1].classList.remove("little-text");
				  node.children[1].classList.add("middle-text");
			  }
				else {
				  node.children[1].classList.remove("little-text");
				  node.children[1].classList.remove("middle-text");
			  }

			  //Информация о размере
			  var elemSizeInfo = qsa('.calc-size-info');
			  var sizeNum;

			  var sizeInfoElem = qs('.calc-size-info.calc-size-info-show');
			  if (sizeInfoElem) sizeInfoElem.classList.remove('calc-size-info-show');

			  elemSizeInfo[e.target.dataset.num-1].classList.add('calc-size-info-show');

			qs('input[name="podushkaNum"]').value = 0;
			  changeSeria(e.target.value);
			  calcPrice();
		};
	}

	qs('div.btn-credit').onclick = function(event) {
		if (calcData.price!=0){
			qs('form[name="calcTinkoff"]').submit();
		}
	};

	qs('input[name="childName"]').onchange = function(event) {calcPrice();};

	qs('.calc-modal-close').onclick = function(event) {
		qs('.calc-modal-container').style.display = 'none';
	};

	qs('.btn-order').onclick = function(event) {
		if (calcData.price){
			qs('.calc-modal-container').style.display = 'block';
			document.body.style.overflow = 'hidden';
		}
	};

	qs('.calc-modal-btn').onclick = function(event) {
		var reg = /^((8|\+7)[\-]?)?(\(?\d{3}\)?[\-]?)?[\d\-]{7,10}$/;
		var phone =  qs('input[name="calc-modal-phone"').value;
		if(reg.test(phone) == false) {
			alert('Введите корректный номер телефона');
		} else {
			sendForm();
		}
	/*	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var address = qs('input[name="calc-modal-email"').value;
		if(reg.test(address) == false) {
			alert('Введите корректный e-mail');
		}
	*/

	};

	testPodushkaStraziSlider();
	calcPrice();
});

window.onload = function () {
	//setIllusionDef(1); //1-установить Иллюзию по умолчанию; 0-установить Спорт по умолчанию
	//calcPrice();
	setActiveSwitches("garmony");
	testSlidersOfCounters();

}

function testSlidersOfCounters() {
	var elem = qs('input[name="bortik"]');
	if (elem.checked == true) {
		elem.parentNode.nextElementSibling.style.opacity = '1';
	}
	var elem = qs('input[name="podushka"]');
	if (elem.checked == true) {
		elem.parentNode.nextElementSibling.style.opacity = '1';
	}
	var elem = qs('input[name="nameBortik"]');
	if (elem.checked == true) {
		elem.parentNode.nextElementSibling.style.opacity = '1';
		qs('input[name="childName"]').removeAttribute('disabled');
	}
}

function testPodushkaStraziSlider() {
	var podNumSlider = qs('input[name="podushka"]');
	var straziSlider = qs('input[name="straziPodushki"]');
	var seria = qs('input[name="calc-size"]:checked').value;

	if (((qs('input[name="podushkaNum"]').value == '0') || (podNumSlider.checked==false)) || ((seria=="0")||(seria=="4"))) {
		straziSlider.removeAttribute('checked');
		straziSlider.checked = false;
		straziSlider.parentNode.style.display = 'none';
	} else  {
		straziSlider.parentNode.style.display = 'block';
	}
}

function sendForm() {
	var data_str = 'name=' + qs('input[name="calc-modal-name"]').value + "&phone=" + qs('input[name="calc-modal-phone"]').value+
				"&email=" + qs('input[name="calc-modal-email"]').value +"&city=" + qs('input[name="calc-modal-city"]').value+
				"&data=" + qs('input[name="itemName_0"]').value+"&num=" + qs('input[name="divanNum"]').value+
				"&price=" + calcData.price;

	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('POST', 'mailsend.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onreadystatechange = function() { // (3)
	if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
		//	alert(xhr.status + ': ' + xhr.statusText);
		  } else {
			qs(".calc-modal-body").innerHTML = xhr.responseText;
		  }
	}
	xhr.onerror = function() {
	  alert( 'Ошибка ' + this.status );
	}
	xhr.send(data_str);
}

function calcPrice() {
	calcData.price = 0;
	var priceList;
	var choise = qs('input[name="calc-size"]:checked').dataset.num;
	var formData={};
	var podushkaNum = qs('input[name="podushkaNum"]').value;
	var divanNum = qs('input[name="divanNum"]').value;

	testPodushkaStraziSlider();

	console.log(+choise-1);
	console.log(calcData.priceMatrix);
  console.log(calcData.priceNum);
	priceList = calcData.priceMatrix[calcData.priceNum[+choise-1]];
	console.log(priceList);
	calcData.price = priceList[0];
	formData.name = '';
	//formData.size = qs('input[value="'+choise+'"]').nextElementSibling.innerHTML+ '; ';

	if ((choise==1)||(choise==2)||(choise==3)||(choise==4)||(choise==5)||(choise==6)){
		if (qs('input[name="matras"]').checked==true) {
			calcData.price += priceList[1];
			formData.matras = "Матрас; ";
		}
		if (qs('input[name="odnoton-namatrasnik"]').checked==true){
			calcData.price += priceList[3];
			formData.monotoneNamatras = "Однотонный наматрасник; ";
		}
	}

	if( choise > 3 && choise < 9 ) {
		if (qs('input[name="steg_nam"]').checked==true) {
			calcData.price += priceList[priceList.length-1];
			formData.steg_nam = "Стёганый наматрасник; ";
		}
	}

	

	if (qs('input[name="nameBortik"]').checked==true) {
		console.log(choise);
		if ((choise==9)||(choise==10)) {
			calcData.price += priceList[1];
		}
		else if ((choise==7)||(choise==8)) {
			calcData.price += priceList[7];
		}
		else if(choise==11) {
			calcData.price += priceList[8];
		}
		else if((choise==1) || (choise==2) || (choise==3)) {
			calcData.price += priceList[6];
		}
		else {
			calcData.price += priceList[6];
		}
		formData.bortikName = "Бортик именной: " + qs('input[name="childName"]').value + "; ";
	}

	//Иллюзия с ящиком
	if ((choise==7)||(choise==8)){
		if (qs('input[name="matras1_1"]').checked==true) {
			calcData.price += priceList[1];
			formData.matras1 = "Матрас 1700*800;";
		}
		if (qs('input[name="matras1_2"]').checked==true) {
			calcData.price += priceList[2];
			formData.matras2 = "Матрас 1600*800;";
		}
		if (qs('input[name="matras2_1"]').checked==true) {
			calcData.price += priceList[1];
			formData.matras3 = "Матрас 1800*800;";
		}
		if (qs('input[name="matras2_2"]').checked==true) {
			calcData.price += priceList[2];
			formData.matras4 = "Матрас 1700*800;";
		}
		if (qs('input[name="namatrasnik1_1"]').checked==true) {
			calcData.price += priceList[3];
			formData.namatrasnik1 = "Наматрасник 1700*800; ";
		}
		if (qs('input[name="namatrasnik1_2"]').checked==true) {
			calcData.price += priceList[4];
			formData.namatrasnik2 = "Наматрасник 1600*800; ";
		}
		if (qs('input[name="namatrasnik2_1"]').checked==true) {
			calcData.price += priceList[3];
			formData.namatrasnik3 = "Наматрасник 1800*800; ";
		}
		if (qs('input[name="namatrasnik2_2"]').checked==true) {
			calcData.price += priceList[4];
			formData.namatrasnik4 = "Наматрасник 1700*800; ";
		}
		if (qs('input[name="straziSpinki"]').checked==true) {
			calcData.price += priceList[8];
			formData.straziSpinki = "Стразы на спинке; ";
		}
		if (qs('input[name="straziPodushki"]').checked==true) {
			calcData.price += (priceList[9] * podushkaNum);
			formData.straziPodushka = "Стразы на подушке; ";
		}
		if (qs('input[name="straziBox"]').checked==true) {
			calcData.price += priceList[10];
			formData.yashik = "Стразы на ящике; ";
		}
		if (choise==7) formData.name = 'Кровать ИЛЛЮЗИЯ с ящиком 1780х850; ';
		if (choise==8) formData.name = 'Кровать ИЛЛЮЗИЯ с ящиком 1880х850; ';
	}

	if ((choise==1)||(choise==2)||(choise==3)||(choise==4)||(choise==5)||(choise==6)||(choise==7)||(choise==8)||choise==11||choise==12||choise==13){
		if (qs('input[name="podushka"]').checked==true) {
			if((choise==7)||(choise==8)) {
			  calcData.price += priceList[5]*(+(podushkaNum));
			}
			else  {
			  calcData.price += priceList[4]*(+(podushkaNum));
			}
			formData.podushka = "Подушка: " + podushkaNum + "шт; ";
		}
	}

	if ((choise!=9)&&(choise!=10)){
		if (qs('input[name="bortik"]').checked==true) {
		  console.log('бортик');
			var bortikNum = qs('input[name="bortikNum"]').value;
			if((choise==7)||(choise==8)) calcData.price += priceList[6]*(+(bortikNum));
			else calcData.price += priceList[5]*(+(bortikNum));
			formData.bortik = "Бортик однотонный: " + bortikNum + "шт; ";
		}
	}


	if ((choise==1)||(choise==2)||(choise==3)) {
		//Серия Спорт
		if (qs('input[name="namatrasnik"]').checked==true) {
			calcData.price += priceList[2];
			formData.namatrasnik = "Наматрасник; ";
		}
		formData.name = 'Кровать "Спорт"; ';
	}

	if ((choise==4)||(choise==5)||(choise==6)){
		if (qs('input[name="straziSpinki"]').checked==true) {
			calcData.price += priceList[7];
			formData.straziSpinki = "Стразы на спинке; ";
		}
		if (qs('input[name="straziPodushki"]').checked==true) {
			calcData.price += (priceList[8] * podushkaNum);
			formData.straziPodushka = "Стразы на подушке; ";
		}
		formData.name = 'Кровать "Иллюзия"; ';
	}

	if ((choise==9)||(choise==10)) {
		if (qs('input[name="straziPufik"]').checked==true) {
			calcData.price += priceList[2];
			formData.straziPufik = "Стразы на пуфике; ";
		}
	}

	//Кровать Гармония
	if(choise == 11|| choise == 12 || choise == 13) {
    if (qs('input[name="matras3_1"]').checked==true) {
      console.log('matras3_1');
      calcData.price += priceList[1];
      formData.matras5 = "Детский ортопедический матрас;";
    }
    if (qs('input[name="namatrasnik3_1"]').checked==true) {
      console.log('namatrasnik3_1');
      calcData.price += priceList[2];
      formData.namatrasnik = "Наматрасник;";
    }
    if (qs('input[name="steg_nam"]').checked==true) {
      calcData.price += priceList[3];
      formData.steg_nam = "Стёганый наматрасник;";
    }

    if (qs('input[name="straziSpinki"]').checked==true) {
      calcData.price += priceList[6];
      formData.straziSpinki = "Стразы на спинке; ";
		}
		
		if (qs('input[name="straziPodushki"]').checked==true) {
			calcData.price += (priceList[7] * podushkaNum);
			formData.straziPodushka = "Стразы на подушке; ";
		}

  }

	var strPrice = calcData.price * divanNum +'';
	var priceElem = qs('span.price-num');
	priceElem.innerHTML = (strPrice.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, " $1 ").trim())+'руб.';

	if ((choise!=9)&&(choise!=10)) {
		priceElem.style.color = 'red';
		priceElem.style.textDecoration = 'line-through';
		priceElem.parentNode.previousElementSibling.style.display = 'block';

		//скидка 3300рублей
		if (calcData.price>0) {
			calcData.price -= 3300;
			calcData.price *= divanNum;
		}
	} else {
		//Если пуфик, то скидку не отображать
		priceElem.style.color = 'green';
		priceElem.style.textDecoration = 'none';
		priceElem.parentNode.previousElementSibling.style.display = 'none';
		formData.name = 'Пуфик';
	}

	strPrice = calcData.price +'';
	if ((choise!=9)&&(choise!=10)) qs('span.price-action-num').innerHTML = (strPrice.replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, " $1 ").trim())+'руб.';
	else qs('span.price-action-num').innerHTML = '';

	if (calcData.price) {
		var tinkovForm = document.forms.calcTinkoff;
		var nameStr = '';
		for (var key in formData){
			nameStr += formData[key];
		}
		tinkovForm.elements.sum.value = calcData.price;
		tinkovForm.elements.itemName_0.value = nameStr;
		tinkovForm.elements.itemQuantity_0.value = divanNum;
		tinkovForm.elements.itemPrice_0.value = (calcData.price)/divanNum;
	}

	// console.log(formData);
}

function selectImg(e,elem) {
	if(e) {
		elem = e.target;
		qs('div.mini-pictures.active-gallery .img-active').classList.remove('img-active');
	}
	elem.classList.add('img-active');

	var oldImg = qs('.main-picture img');
	qs('.main-picture').removeChild(oldImg);
	var newImg = elem.cloneNode();
	qs('.main-picture').appendChild(newImg);
}

function changeSeria(num) {

	var imgBlocks = qsa('div.mini-pictures');

	var oldActive = qs('div.mini-pictures.active-gallery');
	oldActive.classList.remove('active-gallery');
	oldActive.classList.add('hidden-gallery');

	imgBlocks[num].classList.add('active-gallery');
	selectImg(null,imgBlocks[num].querySelector('.img-active'));

	switch (num) {
		case "0": //Серия Спорт
			setActiveSwitches("sport");
		break;
		case "1": //серия Иллюзия
			setActiveSwitches("illus");
			testPodushkaStraziSlider();
		break;
		case "2":
			setActiveSwitches("box1");
			testPodushkaStraziSlider();
		break;
		case "3":
			setActiveSwitches("box2");
			testPodushkaStraziSlider();
		break;

		case "4":
			setActiveSwitches("pufik");
			break;

		case "7":
			console.log(num);
			setActiveSwitches('garmony');
	}
}
function setActiveSwitches(model) {
	var elem = calcData.firstSwitch;
	while (!(elem.classList.contains("calc-prices"))) {
		if (elem.classList.contains(model)) elem.style.display = 'block';
		else elem.style.display = 'none';
		elem = elem.nextElementSibling;
	}
}
