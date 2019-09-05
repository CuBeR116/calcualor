$(window).on('load', function () {
  modal();
  feedback();
});

function modal() {
  $(document).on('click', '[data-target="modal"]', function (e) {
    e.preventDefault();
    modalOpen($(this).data('modal'));
  });
  $('[data-modal-close]').on('click', function (e) {

    if ($(e.target).data('modal-close')) {
      console.log('modal close');
      modalClose();
    }
  });
}

function modalClose() {
  $('[data-modal-block]').fadeOut();
}

function modalOpen(id) {
  console.log(id);
  $(id).fadeIn();
}


function feedback() {
  $('[data-feedback]').on('submit', function (e) {
    e.preventDefault();
    let form = $(this);
    let obj = {};
    let array = [];
    let productsForm = $('[data-feedback="products"]');
    console.log(productsForm.serializeArray());
    obj = productsForm.serializeArray();
    let data = {};
    for (let key in obj) {
      array = (obj[key]['name'].split('|'));
      if (array.length === 2) {
        if (data[array[0]])
          data[array[0]] += "\n" + '- ' + obj[key].value;
        else
          data[array[0]] = obj[key].value;

        console.log(data);
      }
      else if (array.length === 3) {
        data[array[0]] += ' [' + obj[key].value + ']';
      }
      else {
        if (obj[key]['name'].indexOf('itemName') === -1) {
          data[obj[key]['name']] = obj[key].value;
        }
      }
    }

    console.log(data);

    let key,
      n = null,
      result = [];

    for (key in data) {
      if (key.indexOf('itemName') !== -1) {
        n = Number(key.replace('itemName_', ''));
        result[n] = data[key];
      }
    }

    console.log(result);
    $.ajax({
      url: form.attr('action'),
      type: 'post',
      data: {
        personal: form.serializeArray(),
        products: data,
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        // alert(data.message);
        // location.reload();
      },
      error: function () {
        alert('Ошибка');
      }
    });
  });
}