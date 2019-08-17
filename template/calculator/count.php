<div class="calc__options-item"
     data-next="block"><p>Количество</p>
  <div class="calc__options-count" data-count>
    <button type="button"
            @click="changeCount('-1')">-
    </button>
    <input title="Количество"
           readonly="readOnly"
           :value="count">
    <button type="button"
            @click="changeCount('+1')">+
    </button>
  </div>
</div>

<script>
  let countElement = new Vue({
    el: '[data-count]',
    data: {
      count: 1,
    },
    methods: {
      changeCount: function (val) {
        let newCount = this.count + Number(val);
        if(newCount > 0) {
          this.count = newCount;
        }
      },
    },
    ready: function() {
      this.changeCount();
    },
  });
</script>