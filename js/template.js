$(window).on('load', function () {

});
let valDiscount = 3300;
//Останов - Дизайн и $_POST на заказ

class Calc {

  constructor() {
    this.price = 0;
    this.originalPriceBlock = {};
    this.discountPriceBlock = {};
    this.discount = 0;
    this.count = 1;
    this.boolDiscount = 'true';
  }

  static setPrice(newPrice) {
    if (this.count === undefined) {
      this.count = 1;
    }
    this.price = this.count * newPrice;
  }

  static getPrice() {
    if (this.count === undefined) {
      this.count = 1;
    }
    console.log(this.count);
    let returnPrice = this.price / this.count;
    return returnPrice;
  }
  static getDiscountPrice() {
    if (this.count === undefined) {
      this.count = 1;
    }
    return this.price - valDiscount * this.count;
  }

  static calcRender(JSON) {
    console.log(JSON);
    this.price = JSON.PRICE;
    this.discount = 0.75;
    if (JSON.DISCOUNT === false) {
      this.boolDiscount = false;
    }
    else {
      this.boolDiscount = true;
    }

    let description = $('<ul>', {
      class: 'calc__description-ul'
    });

    let photos = $('<div>', {
      class: 'calc__photo-items'
    });

    let selectList = $('<div>', {
      'data-list': '',
      class: 'calc__select__items-select hidden',
    });

    let options = $('<form>', {
      target: '_blank',
      'data-change': '',
      'data-target': 'form',
      action: 'https://loans.tinkoff.ru/api/partners/v1/lightweight/create',
      method: 'POST',
      class: 'calc__options-block',
      html: [
        $('<div>', {
          class: 'calc__options-item',
          'data-next': 'block',
          html: [
            $('<p>', {
              html: 'Количество'
            }),
            $('<div>', {
              class: 'calc__options-count',
              html: [
                $('<button>', {
                  type: 'button',
                  html: '+',
                  'data-value': '-1',
                }),
                $('<input>', {
                  'data-type': 'count',
                  'data-key': 'BASE',
                  'data-global-count': '',
                  readOnly: 'readonly',
                  value: 1,
                }),
                $('<button>', {
                  type: 'button',
                  html: '+',
                  'data-value': '+1',
                }),
              ]
            }),
          ]
        }),

      ]
    });

    let photo, text, name, optionKey, key, activePhoto, photoKey, objPhoto;
    let n = 0;

    if (JSON.PHOTOS) {
      let keys = Object.keys(JSON.PHOTOS); //получаем ключи объекта в виде массива
      let firstPhoto = (JSON.PHOTOS[keys[0]]); // первый элемент

      console.log(firstPhoto);
      activePhoto = $('<img>', {
        src: firstPhoto,
        'data-photo-active': '',
        class: 'calc__photo-activeImg',
      });
      for (photoKey in JSON.PHOTOS) {

        photos.append($('<div>', {
          'data-photo': JSON.PHOTOS[photoKey],
          class: ((n === 0) ? 'active ' : '') + 'calc__photo-item',
          html: $('<img>', {
            src: JSON.PHOTOS[photoKey],
            class: 'calc__photo-item__img'
          })
        }));

        n++;
      }
    }

    if (JSON.DESCRIPTION) {
      for (text of JSON.DESCRIPTION) {
        description.append($('<li>', {
          class: 'calc__options',
          html: text
        }));
      }
    }

    if (JSON.LIST) {
      for (key in JSON.LIST) {
        selectList.append($('<div>', {
          class: 'calc__select__item',
          'data-select': key,
          html: [
            $('<img>', {
              src: JSON.LIST[key].PREVIEW_PICTURE,
            }),
            $('<p>', {
              html: JSON.LIST[key].NAME,
            })
          ]
        }));
      }
    }

    if (JSON.OPTIONS) {
      for (optionKey in JSON.OPTIONS) {

        if (JSON.OPTIONS[optionKey].TYPE === 'text') {
          options.append($('<div>', {
            class: 'calc__options-item',
            html: [
              $('<div>', {
                class: 'calc__options-item__top',
                html: [
                  $('<label>', {
                    class: 'calc__options-item__top-label',
                    html: [
                      $('<p>', {
                        html: JSON.OPTIONS[optionKey].NAME,
                      }),
                      $('<input>', {
                        name: optionKey,
                        type: 'checkbox',
                        value: JSON.OPTIONS[optionKey].NAME,
                        'data-key': optionKey
                      }),
                      $('<div>', {
                        class: 'checkbox__controller'
                      })
                    ]
                  }),
                ],
              }),
              $('<div>', {
                'data-next': 'block',
                class: 'calc__options-item__hiddenInput',
                css: {
                  'display': 'none'
                },
                html: [
                  $('<input>', {
                    name: optionKey + '-price',
                    type: 'text',
                    'data-key': optionKey,
                    'data-type': 'text',
                    disabled: 'disabled',
                    placeholder: 'Введите - ' + JSON.OPTIONS[optionKey].NAME,
                    'data-next': optionKey,
                  }),
                ]
              }),
            ]
          }));
        }
        else if (JSON.OPTIONS[optionKey].TYPE === 'count') {
          options.append($('<div>', {
            class: 'calc__options-item',
            html: [
              $('<div>', {
                class: 'calc__options-item__top',
                html: [
                  $('<label>', {
                    class: 'calc__options-item__top-label',
                    html: [
                      $('<p>', {
                        html: JSON.OPTIONS[optionKey].NAME,
                      }),
                      $('<input>', {
                        name: optionKey,
                        type: 'checkbox',
                        val: JSON.OPTIONS[optionKey].NAME,
                        'data-key': optionKey
                      }),
                      $('<div>', {
                        class: 'checkbox__controller',
                      })
                    ]
                  }),
                ]
              }),
              $('<div>', {
                class: 'calc__options-count',
                'data-next': 'block',
                css: {
                  'display': 'none',
                },
                html: [
                  $('<button>', {
                    type: 'button',
                    html: '+',
                    disabled: 'disabled',
                    'data-key': optionKey,
                    'data-value': '-1',
                  }),
                  $('<input>', {
                    type: 'text',
                    readOnly: 'readonly',
                    'data-next': optionKey,
                    'data-key': optionKey,
                    'data-type': 'count',
                    disabled: 'disabled',
                    name: optionKey + '-count',
                    value: 1,
                  }),
                  $('<button>', {
                    type: 'button',
                    disabled: 'disabled',
                    html: '+',
                    'data-key': optionKey,
                    'data-value': '+1',
                  }),
                ]
              }),

            ]
          }));
        }
        else if (JSON.OPTIONS[optionKey].TYPE === 'basic') {
          options.append($('<input>', {
            type: 'hidden',
            name: 'productName',
            val: JSON.OPTIONS[optionKey].NAME,
          }));
        }
        else if (JSON.OPTIONS[optionKey].AFTER) {
          options.append($('<div>', {
            class: 'calc__options-item',
            html: [
              $('<div>', {
                class: 'calc__options-item__top',
                css: {
                  'display': 'none',
                },
                html: [
                  $('<label>', {
                    class: 'calc__options-item__top-label',
                    html: [
                      $('<p>', {
                        html: JSON.OPTIONS[optionKey].NAME,
                      }),
                      $('<input>', {
                        name: optionKey,
                        type: 'checkbox',
                        'data-key': optionKey,
                        value: JSON.OPTIONS[optionKey].NAME,
                        'data-child': JSON.OPTIONS[optionKey].AFTER,
                      }),
                      $('<div>', {
                        class: 'checkbox__controller'
                      }),
                    ]
                  }),
                ]
              }),
            ]
          }));
        }
        else {
          options.append($('<div>', {
            class: 'calc__options-item',
            html: [
              $('<div>', {
                class: 'calc__options-item__top',
                html: [
                  $('<label>', {
                    class: 'calc__options-item__top-label',
                    html: [
                      $('<p>', {
                        html: JSON.OPTIONS[optionKey].NAME,
                      }),
                      $('<input>', {
                        name: optionKey,
                        type: 'checkbox',
                        value: JSON.OPTIONS[optionKey].NAME,
                        'data-key': optionKey
                      }),
                      $('<div>', {
                        class: 'checkbox__controller'
                      })
                    ]
                  }),
                ]
              }),
            ]
          }));
        }
      }

      options.append($('<div>', {
        class: 'calc__submit-block',
        html: [
          $('<input>', {
            type: 'hidden',
            val: 'dardav',
            name: 'shopId'
          }),
          $('<input>', {
            type: 'hidden',
            name: 'sum'
          }),
          $('<button>', {
            type: 'button',
            html: 'Заказать',
            class: 'form-modal__button',
            'data-target': 'modal',
            'data-modal': '#feedback',
          }),
          $('<input>', {
            type: 'submit',
            class: 'form-submit__buy',
            value: 'Купить в кредит',
          }),
          $('<input>', {
            name: 'itemPrice_0',
            'data-sum': '',
            type: 'hidden',
          }),
          $('<input>', {
            name: 'itemQuantity_0',
            type: 'hidden',
            val: 1,
          }),
          $('<input>', {
            name: 'itemName_0',
            type: 'hidden',
            val: '',
          })
        ],
      }));

    }

    console.log(JSON.PRICE);

    $('.calc-block').addClass('container').html($('<div>', {
      class: 'calc-flex',
      html: [
        $('<div>', {
          class: 'calc-left',
          html: [
            $('<div>', {
              class: 'calc__photo-block',
              html: [
                $('<div>', {
                  class: 'calc__photo-active',
                  html: activePhoto
                }),
                photos,
              ]
            }),
            $('<div>', {
              class: 'calc__description',
              html: description,
            }),
          ]
        }),
        $('<div>', {
          class: 'calc-right',
          html: [
            $('<div>', {
              class: 'calc__options-block',
              html: [
                $('<div>', {
                  class: 'calc__select__list',
                  html: [
                    $('<div>', {
                      class: 'calc__select__active-item',
                      html: JSON.NAME,
                      'data-click': 'openList'
                    }),
                    $('<div>', {
                      class: 'calc__select__list-block',
                      html: selectList,
                    }),
                  ]
                }),
                $('<div>', {
                  class: 'calc__select__items-option',
                  html: [
                    options,
                  ]
                }),
                console.log(typeof Calc.boolDiscount),
                $('<div>', {
                  class: 'calc__price-item',
                  html: [
                    $('<p>', {
                      class: ((Calc.boolDiscount === false) ? 'd-none' : 'calc__price-discount'),
                      html: 'Акция!',
                    }),
                    $('<div>', {
                      class: 'calc__price-top',
                      html: [
                        $('<span>', {
                          html: 'Цена: ',
                          class: 'calc__price-text'
                        }),
                        $('<span>', {
                          html: this.priceFormat(JSON.PRICE) + ' руб.',
                          'data-price': 'original',
                          class: 'calc__price-original'
                        }),
                      ]
                    }),
                    $('<div>', {
                      class: 'calc__price-bottom',
                      html: [
                        $('<span>', {
                          html: (Calc.boolDiscount === true) ? this.priceFormat(JSON.PRICE - valDiscount) + ' руб.' : this.priceFormat(JSON.PRICE) + ' руб.',
                          'data-price': 'discount',
                          class: 'calc__price-discount__val'
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ],
    }));


    this.originalPriceBlock = $('[data-price="original"]');
    this.discountPriceBlock = $('[data-price="discount"]');

    console.log(this.boolDiscount);
    if (this.boolDiscount === false) {
      this.discountPriceBlock.addClass('nonDiscount').closest('div').prepend($('<p>', {
        html: 'Цена: '
      }));
      this.originalPriceBlock.closest('div').css('display', 'none');
    }

    //Список функции
    this.optionSelect(JSON);
    orderBank();
    selectNew();
  }


  static optionSelect(JSON) {
    let form = $('[data-change]');
    form.on('change', 'input[type="checkbox"]', function (e) {

      console.log('changed');
      let $this = $(this);
      let price = Number(JSON.OPTIONS[$this.data('key')]['PRICE']);
      let key = $this.data('key');
      let originalPrice, discountPrice;
      let countElement = $('[data-next="' + key + '"][data-type="count"]');
      let parentElement = {};
      let childElement = $('[data-child="' + key + '"]');

      if ($this.data('child')) {
        parentElement = $('[data-next="' + $this.data('child') + '"]');
      }

      console.log(childElement);
      // if(childElement.length > 0) {
      //   childElement.fadeToggle().closest('div').fadeToggle();
      // }
      form.find('[data-child="' + key + '"]').closest('div').fadeToggle();


      if ($this.is(':checked')) {
        if (countElement.length > 0) {
          if (childElement.length > 0 && childElement.is(':checked') === true) {
            console.log('checked');
            price = Number(countElement.val()) * Number(price) + Number(countElement.val()) * Number(JSON.OPTIONS[childElement.data('key')]['PRICE']);
          }
          else {
            price = Number(countElement.val()) * Number(price);
          }
        }

        if (parentElement.length > 0) {
          price = Number(parentElement.val() * Number(price));
        }


        Calc.setPrice(Number(Calc.getPrice()) + Number(price));

        if (form.find('[data-next="' + key + '"]').length > 0) {
          let childElement = form.find('[data-next="' + key + '"]');
          childElement.closest('[data-next="block"]').fadeIn()
            .find('button').removeAttr('disabled');
          childElement.closest('[data-next="block"]').find('input').removeAttr('disabled');
        }
      }
      else {
        if (countElement.length > 0) {
          if (childElement.length > 0 && childElement.is(':checked')) {
            price = Number(countElement.val()) * Number(price) + Number(countElement.val()) * Number(JSON.OPTIONS[childElement.data('key')]['PRICE']);

            childElement.prop('checked', false);
          }
          else {
            price = Number(countElement.val()) * Number(price);
          }
        }
        else {
          if (childElement.length > 0 && childElement.is(':checked')) {
            price = Number(JSON.OPTIONS[childElement.data('key')]['PRICE']) + Number(price);
            childElement.prop('checked', false);
          }
        }

        if (parentElement.length > 0) {
          price = Number(parentElement.val() * Number(price));
        }

        Calc.setPrice(Calc.getPrice() - Number(price));

        if (form.find('[data-next="' + key + '"]').length > 0) {
          let childElement = form.find('[data-next="' + key + '"]');
          childElement.closest('[data-next="block"]').fadeOut()
            .find('button').attr('disabled', 'disabled');
          childElement.closest('[data-next="block"]').find('input').removeAttr('disabled');
        }
      }


      Calc.originalPriceBlock.html(Calc.priceFormat(Calc.price) + ' руб.');

      if (Calc.boolDiscount === true) {
        Calc.discountPriceBlock.html(Calc.priceFormat(Calc.getDiscountPrice()) + ' руб.');
      }
      else {
        Calc.discountPriceBlock.html(Calc.priceFormat(Calc.price) + ' руб.');
      }

      console.log(price);
    });

    form.on('click', '[data-value]', function (e) {
      e.preventDefault();
      let $this = $(this);
      let value = $(this).data('value');
      let input = $(this).closest('[data-next="block"]').find('input');
      let newValue = Number(input.val()) + Number(value);
      let key = null;
      let childElement = {};
      let price;

      if ($this.data('key')) {
        key = $this.data('key');
        childElement = $('[data-child="' + key + '"]');
      }

      if (newValue > 0) {


        //Удалить ранее добавленную цену
        if (input.data('global-count') === '') {
          Calc.price = Calc.getPrice() * newValue;
          Calc.count = (Number(newValue));
          console.log(Calc.price);
        }
        else {
          Calc.setPrice(Calc.getPrice() - Number(input.val()) * Number(JSON.OPTIONS[input.data('key')]['PRICE']));

          if (childElement.length > 0 && childElement.is(':checked')) {
            Calc.setPrice(Calc.getPrice() - (Number(input.val()) * Number(JSON.OPTIONS[childElement.data('key')]['PRICE'])));

            Calc.setPrice(Calc.getPrice() + (Number(newValue) * Number(JSON.OPTIONS[input.data('key')]['PRICE'])) + Number(newValue) * (Number(JSON.OPTIONS[childElement.data('key')]['PRICE'])));
          }
          else {
            Calc.setPrice(Calc.getPrice() + (Number(newValue) * Number(JSON.OPTIONS[input.data('key')]['PRICE'])));
          }
        }


        input.val(Number(input.val()) + Number(value));

        Calc.originalPriceBlock.html(Calc.priceFormat(Calc.price) + ' руб.');
        if (Calc.boolDiscount === true) {
          Calc.discountPriceBlock.html(Calc.priceFormat(Calc.getDiscountPrice()) + ' руб.');
        }
        else {
          Calc.discountPriceBlock.html(Calc.priceFormat(Calc.price) + ' руб.');
        }


        if (input.data('global-count') === '') {
        }

      }
    });


    $('[data-photo]').on('click', function (e) {
      console.log('clicked_data-photo');
      let src = $(this).data('photo');
      $('.active[data-photo]').removeClass('active');
      $('[data-photo-active]').attr('src', src);

      $(this).addClass('active');
    });

    $('[data-click="openList"]').on('click', function (e) {
      $(this).toggleClass('active');
      $('[data-list]').slideToggle();
    });

    form.on('click', function (e) {

    });
  }

  static priceFormat(str) {
    return str.toLocaleString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

}

function orderBank() {
  $('[data-target]').on('click', 'input[type="submit"]', function (e) {
    let form = $(this).closest('[data-target]');
    e.preventDefault();
    form.find('[name="sum"]').val(Calc.price * Calc.discount);
    form.find('[data-sum]').val(Calc.price * Calc.discount);
    let objForm = form.find('input[type="checkbox"][data-key]:checked');
    let itemElement = form.find('[name="itemName_0"]');
    let strItems = '';
    let child;
    if (Calc.count === undefined) Calc.count = 1;

    strItems = form.find('[name="productName"]').val() + ' x' + Calc.count.toString() + '; ';

    console.log(objForm);
    objForm.each(function (element, key) {
      console.log($(this).val());
      child = form.find($('[data-next="' + $(this).data('key') + '"]'));


      if (child.length > 0) {
        if (child.data('type') === 'count') {
          strItems += $(this).val() + ' x' + child.val() + '; ';
        }
        else {
          strItems += $(this).val() + ' [' + child.val() + ']; ';
        }
      }
      else {
        strItems += $(this).val() + '; ';
      }
    });

    itemElement.attr('value', strItems);

    form.submit();
  });
}

function selectNew() {
  $('[data-select]').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    $.ajax({
      url: '/functions/getAjaxProduct.php',
      type: 'post',
      data: {
        'key': $this.data('select')
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        Calc.calcRender(data);
      },
      error: function () {
        alert('Ошибка');
      }
    });
  });
}