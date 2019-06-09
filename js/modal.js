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

    if($(e.target).data('modal-close')) {
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
    $.ajax({
      url: form.attr('action'),
      type: 'post',
      data: form.serializeArray(),
      dataType: 'json',
      success: function (data) {
        console.log(data);
        alert(data.message);
        location.reload();
      },
      error: function () {
        alert('Ошибка');
      }
    });
  });
}