<?php
/**
 * Created by PhpStorm.
 * User: CuBeR116
 * Date: 07.06.2019
 * Time: 1:26
 * Mail: cuber116@gmail.com
 */
?>

<div data-modal-block
     class="calc-modal-container"
     data-modal-close="close"
     id="feedback">
  <div class="calc-modal">
    <div class="calc-modal-close"
         data-modal-close="close">❌
    </div>
    <div class="calc-modal-header">Оформить заявку</div>
    <div class="calc-modal-body">
      <form action="/functions/feedback.php"
            data-feedback>
        <input class="calc-modal-input"
               placeholder="Имя"
               maxlength="300"
               name="calc-modal-name"
               value=""
               type="text">
        <input class="calc-modal-input"
               required=""
               placeholder="Телефон *"
               maxlength="300"
               name="calc-modal-phone"
               value=""
               type="text">
        <input class="calc-modal-input"
               placeholder="E-mail"
               maxlength="300"
               name="calc-modal-email"
               value=""
               type="text">
        <input class="calc-modal-input"
               placeholder="Город"
               maxlength="300"
               name="calc-modal-city"
               value=""
               type="text">
        <input class="calc-modal-btn"
               type="submit"
               value="Отправить">
      </form>
    </div>
    <div class="calc-modal-footer">
      <div class="calc-modal-personal">
        <p>Нажимая на кнопку, вы принимаете
          <a style="color:rgba(50, 136, 230, 1);"
             href="/regulation.html"
             target="_blank"
             rel="nofollow">Положение</a> и
          <a style="color:rgba(50, 136, 230, 1);"
             href="/consent.html"
             target="_blank"
             rel="nofollow">Согласие</a> на обработку персональных данных.</p>
      </div>
    </div>

  </div>
</div>
