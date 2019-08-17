<div class="calc__price-bottom" data-price>
  <span class="calc__price-discount__val">{{ price }} руб.</span>
</div>

<script>
  let sumProduct = new Vue({
    el: '[data-price]',
    data: {
      price: <?= json_encode($_POST['price']) ?>,
    },
  });
</script>