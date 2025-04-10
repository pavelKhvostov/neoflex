import ContentLoader from 'react-content-loader';
import { Counter } from './Counter';
import { useEffect, useState } from 'react';
import { Modal } from './Modal';

export function Card({
  isOrder,
  title,
  id,
  imageUrl,
  price,
  rate,
  decr,
  isLoading,
  onClickAddItem,
  onClickRemoveItem,
  onClickRemoveItemNow,
  onClickItemToModal,
}) {
  const item = { title, id, imageUrl, price, decr };
  const [isActive, setIsActive] = useState(false);

  const onClickBuy = () => {
    setIsActive(true);
    localStorage.setItem(`isActive_${id}`, 'true');
  };

  const handleClickBuy = (e) => {
    e.stopPropagation();

    onClickBuy();
    onClickAddItem(item);
  };

  useEffect(() => {
    const savedIsActive = localStorage.getItem(`isActive_${id}`);
    if (savedIsActive === 'true') {
      setIsActive(true);
    }
  }, [id]);

  return (
    <div onClick={() => onClickItemToModal(item)} className={isOrder ? 'card__order' : 'card'}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={350}
          height={350}
          viewBox='0 0 350 410'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='1' y='0' rx='10' ry='10' width='300' height='230' />
          <rect x='0' y='257' rx='10' ry='10' width='300' height='15' />
          <rect x='0' y='295' rx='9' ry='9' width='110' height='15' />
          <rect x='216' y='294' rx='11' ry='11' width='80' height='15' />
        </ContentLoader>
      ) : (
        <>
          <img className='card__img' src={`${process.env.PUBLIC_URL}/${imageUrl}`} alt='наушники' />
          <div className='card__bottom'>
            <div className='card__inner'>
              <h3 className='card__title'>{title}</h3>
              <span className='card__price'>{price} ₽</span>
            </div>
            <div className='card__inner'>
              {!isOrder && (
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
              )}
              <div className='card__inner-btns'>
                <button
                  onClick={(e) => handleClickBuy(e)}
                  className={isActive ? 'card__buy--disabled' : 'card__buy'}
                >
                  Купить
                </button>
                {isActive && (
                  <Counter
                    onClickAddItem={onClickAddItem}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    onClickRemoveItem={onClickRemoveItem}
                    title={title}
                    imageUrl={imageUrl}
                    price={price}
                    rate={rate}
                    id={id}
                  />
                )}
              </div>
            </div>
          </div>
          {isOrder && (
            <button
              onClick={(e) => (e.stopPropagation(), onClickRemoveItemNow(item))}
              className='card__remove'
            >
              <svg
                width='21'
                height='17'
                viewBox='0 0 21 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.8848 3.4H20.8667V5.1H18.874V16.15C18.874 16.3754 18.769 16.5916 18.5821 16.751C18.3953 16.9104 18.1418 17 17.8776 17H3.92813C3.66387 17 3.41044 16.9104 3.22358 16.751C3.03672 16.5916 2.93174 16.3754 2.93174 16.15V5.1H0.938965V3.4H5.92091V0.85C5.92091 0.624566 6.02589 0.408365 6.21275 0.248959C6.3996 0.0895533 6.65304 0 6.9173 0H14.8884C15.1527 0 15.4061 0.0895533 15.593 0.248959C15.7798 0.408365 15.8848 0.624566 15.8848 0.85V3.4ZM16.8812 5.1H4.92452V15.3H16.8812V5.1ZM12.3117 10.2L14.0734 11.7028L12.6645 12.9047L10.9029 11.4019L9.14124 12.9047L7.73234 11.7028L9.49396 10.2L7.73234 8.6972L9.14124 7.4953L10.9029 8.9981L12.6645 7.4953L14.0734 8.6972L12.3117 10.2ZM7.91369 1.7V3.4H13.892V1.7H7.91369Z'
                  fill='#DF6464'
                />
              </svg>
            </button>
          )}
          {isOrder && <span className='card__price card__price--double'>{price} ₽</span>}
        </>
      )}
    </div>
  );
}
