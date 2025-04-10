import { use, useEffect, useState } from 'react';

export function FormOrder({ orders, totalPrice }) {
  const [dis, setDis] = useState(false);
  const [submit, setSubmit] = useState(true);
  const initialFormData = {
    tel: '',
    name: '',
    email: '',
    agreement: false,
    item: orders.reduce((acc, item) => {
      acc[item.id] = {
        name: item.title,
        count: localStorage.getItem(`count_${item.id}`),
      };
      return acc;
    }, {}),
    totalPrice: totalPrice,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const newItemData = orders.reduce((acc, item) => {
      acc[item.id] = {
        name: item.title,
        count: localStorage.getItem(`count_${item.id}`),
      };
      return acc;
    }, {});

    setFormData((prevFormData) => ({
      ...prevFormData,
      item: newItemData,
      totalPrice: totalPrice,
    }));
  }, [orders, totalPrice]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!/^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}-?\d{2}-?\d{2}$/.test(formData.tel)) {
      newErrors.tel = 'Введите корректный номер телефона';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ФИО';
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (dis) return;
      setDis(true);
      console.log('Форма отправлена', formData);
      // здесь можно отправить данные на сервер
      setTimeout(() => {
        setSubmit(true);
        setFormData(initialFormData);
        setDis(false);
      }, 3000);
      setTimeout(() => {
        setSubmit(false);
      }, 7000);
    }
  };

  return (
    <form className='form-order' onSubmit={handleSubmit}>
      {submit && (
        <div className='form-order__animate'>
          <span className='form-order__text-animate'>Заказ сформирован! Ждем вас снова.</span>
        </div>
      )}
      <div className='form-order__inner-group'>
        <div className='form-order__col-left'>
          <div className={`custom-input ${errors.tel ? 'error' : ''}`}>
            <label htmlFor='tel' className='custom-input__label'>
              Контактный номер*
            </label>
            <input
              type='tel'
              className='custom-input__field'
              id='tel'
              value={formData.tel}
              onChange={handleChange}
              placeholder='+7 (9__) ___-__-__'
              required
            />
            {errors.tel && <span className='custom-input__error-text'>{errors.tel}</span>}
          </div>
        </div>
        <div className='form-order__col-right'>
          <div className={`custom-input ${errors.name ? 'error' : ''}`}>
            <label htmlFor='name' className='custom-input__label'>
              ФИО*
            </label>
            <input
              type='text'
              className='custom-input__field'
              id='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Иванов Иван Иванович'
              required
            />
            {errors.name && <span className='custom-input__error-text'>{errors.name}</span>}
          </div>
          <div className={`custom-input ${errors.email ? 'error' : ''}`}>
            <label htmlFor='email' className='custom-input__label'>
              Электронная почта
            </label>
            <input
              type='email'
              className='custom-input__field'
              id='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='ivan@email.ru'
            />
            {errors.email && <span className='custom-input__error-text'>{errors.email}</span>}
          </div>
        </div>
      </div>
      <div className='form-order__inner-bottom'>
        <div className='custom-check'>
          <div
            className={`custom-check__inner ${
              errors.agreement ? 'custom-check__inner--error' : ''
            }`}
          >
            <input
              className='custom-check__input visually-hidden'
              id='agreement'
              type='checkbox'
              checked={formData.agreement}
              onChange={handleChange}
            />
            <label className='custom-check__label' htmlFor='agreement'>
              <span className='custom-check__text'>
                Согласен с{' '}
                <a
                  href='https://policies.google.com/privacy?hl=ru'
                  target='_blank'
                  className='custom-check__link'
                >
                  Правилами заказа и доставки
                </a>
                , на обработку в соответствии с ними моих персональных данных и получение рекламы.
              </span>
            </label>
            {errors.agreement && (
              <span className='custom-input__error-text'>{errors.agreement}</span>
            )}
          </div>
        </div>
        <button
          className={dis ? 'form-order__btn form-order__btn--active' : 'form-order__btn'}
          type='submit'
        >
          {dis ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}
