export function Card({ title, imageUrl, price, rate }) {
  return (
    <div className='card'>
      <img className='card__img' src={imageUrl} alt='наушники' />
      <div className='card__bottom'>
        <div className='card__inner'>
          <h3 className='card__title'>{title}</h3>
          <span className='card__price'>{price} ₽</span>
        </div>
        <div className='card__inner'>
          <div className='card__rate'>
            <svg
              className='card__icon-star'
              width='25'
              height='23'
              viewBox='0 0 25 23'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.6268 18.0143L5.41621 22.3656L7.3765 14.2449L0.960785 8.81491L9.38218 8.14829L12.6268 0.439671L15.8715 8.14829L24.2941 8.81491L17.8772 14.2449L19.8375 22.3656L12.6268 18.0143Z'
                fill='#FFCE7F'
              />
            </svg>
            <span className='card__rate-text'>{rate}</span>
          </div>
          <button className='card__buy'>Купить</button>
        </div>
      </div>
    </div>
  );
}
