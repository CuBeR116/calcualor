<div class="calc__select__list"
     data-list>
  <div class="calc__select__active-item"
       @click="isShow = !isShow">{{ product.NAME }}
  </div>

  <div class="calc__select__list-block">
    <transition name="slide">
      <div v-if="isShow"
           class="calc__select__items-select">
        <div v-for="arProduct in product.LIST"
             class="calc__select__item"
             :select="arProduct.NAME">
          <img :src="arProduct.PREVIEW_PICTURE">
          <p>{{ arProduct.NAME }}</p></div>
      </div>
    </transition>
  </div>

</div>

<script>
  let list = new Vue({
    el: '[data-list]',
    data: {
      product: <?= json_encode($_POST) ?>,
      isShow: false,
    },
  });

</script>

<style>
  .slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-to, .slide-leave {
    max-height: 100%;
    overflow: hidden;
  }

  .slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
</style>