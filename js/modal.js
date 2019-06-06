$(window).on('load', function () {
  modal();
});

function modal() {
  $('[data-target="modal"]').on('click', function (e) {
    e.preventDefault();
    modalOpen($(this).data('modal'));
  });
  $('[data-modal-close]').on('click', function (e) {
    modalClose();
  });
}

function modalClose() {
  $('[data-modal-block]').fadeOut();
}

function modalOpen(id) {
  console.log(id);
  $(id).fadeIn();
}