class Calc {
  constructor(JSON) {
    this.price = 0;
    this.discount = 0;
    this.count = 1;
    this.arElement = JSON;
    this.parentBlock = $('.calc-block');
  }

  init() {
    console.log(this.arElement);
    this.getProductsList();
    this.getCount();
    this.getProductSum();
  }

  getProductsList() {

    let parentBlock = this.parentBlock;
    $.post('/template/calculator/products.php', this.arElement, function (data) {
      parentBlock.append(data);
    });
  }

  getCount() {
    let parentBlock = this.parentBlock;
    $.post('/template/calculator/count.php', function (data, status, xhr) {
      parentBlock.append(data);
    });
  }

  getProductSum() {
    let parentBlock = this.parentBlock;
    $.post('/template/calculator/sum.php', {'price': this.arElement.PRICE}, function (data, status, xhr) {
      parentBlock.append(data);
    });
  }
}