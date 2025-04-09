export function FormOrder() {
  return (
    <form class='form-order' action='#' method='get'>
      <div class='form-order__inner-group'>
        <div class='form-order__col-left'>
          <div class='custom-input '>
            <label for='tel' class='custom-input__label'>
              Контактный номер*
            </label>
            <input
              type='tel'
              class='custom-input__field'
              id='tel'
              placeholder='+7 (9__) ___-__-__'
              required
            />
            <span class='custom-input__error-text'>Некорректное значение</span>
          </div>
        </div>
        <div class='form-order__col-right'>
          <div class='custom-input'>
            <label for='name' class='custom-input__label'>
              ФИО*
            </label>
            <input
              type='text'
              class='custom-input__field'
              id='name'
              placeholder='Иванов Иван Иванович'
              required
            />
            <span class='custom-input__error-text'>Некорректное значение</span>
          </div>
          <div class='custom-input '>
            <label for='email' class='custom-input__label'>
              Электронная почта
            </label>
            <input
              type='email'
              class='custom-input__field'
              id='email'
              placeholder='ivan@email.ru'
            />
            <span class='custom-input__error-text'>Некорректное значение</span>
          </div>
        </div>
      </div>
      <div className='form-order__inner-bottom'>
        <div class='custom-check'>
          <div class='custom-check__inner custom-check__inner--error'>
            <input class='custom-check__input visually-hidden' id='conf' type='checkbox' />
            <label class='custom-check__label' for='conf'>
              <span class='custom-check__text'>
                Согласен с{' '}
                <a
                  href='https://policies.google.com/privacy?hl=ru'
                  target='_blank'
                  class='custom-check__link'
                >
                  Правилами заказа и доставки
                </a>
                , на обработку в соответствии с ними моих персональных данных и получение рекламы.
              </span>
            </label>
          </div>
        </div>
        <button class='form-order__btn' type='submit'>
          Отправить
        </button>
      </div>
    </form>
  );
}
