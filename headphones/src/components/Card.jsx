import ContentLoader from 'react-content-loader';
import { Counter } from './Counter';
import { useEffect, useState } from 'react';

import { safeGet, safeSet } from '../utils/storageUtils';

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
  toggleFavorite,
  isActiveInFavorite = false,
}) {
  const item = { title, id, imageUrl, price, decr, rate };
  const [isActive, setIsActive] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isActiveInFavorite);

  const habdleClickHeart = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toggleFavorite(item);
    safeSet(`isFvorite_${id}`, !isFavorite);
  };

  const onClickBuy = () => {
    setIsActive(true);
    safeSet(`isActive_${id}`, 'true');
  };

  const handleClickBuy = (e) => {
    e.stopPropagation();

    onClickBuy();
    onClickAddItem(item);
  };

  useEffect(() => {
    const savedIsActive = safeGet(`isActive_${id}`);

    if (savedIsActive) {
      setIsActive(true);
    }
    const savedIsFavorite = safeGet(`isFvorite_${id}`);
    if (savedIsFavorite) {
      setIsFavorite(true);
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
          {!isOrder && (
            <button
              className={isFavorite ? 'card__favorite card__favorite--active' : 'card__favorite'}
              onClick={(e) => habdleClickHeart(e)}
            >
              <svg
                className=' card__icon-favorite'
                width='24'
                height='24'
                viewBox='0 0 16 16'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.8609 3.07455C13.5204 2.73389 13.1161 2.46365 12.6711 2.27927C12.2261 2.0949 11.7492 2 11.2675 2C10.7859 2 10.3089 2.0949 9.86396 2.27927C9.41898 2.46365 9.0147 2.73389 8.67419 3.07455L7.96753 3.78122L7.26086 3.07455C6.57307 2.38676 5.64022 2.00036 4.66753 2.00036C3.69484 2.00036 2.76199 2.38676 2.07419 3.07455C1.3864 3.76235 1 4.69519 1 5.66788C1 6.64057 1.3864 7.57342 2.07419 8.26122L2.78086 8.96788L7.96753 14.1546L13.1542 8.96788L13.8609 8.26122C14.2015 7.92071 14.4718 7.51643 14.6561 7.07145C14.8405 6.62648 14.9354 6.14954 14.9354 5.66788C14.9354 5.18623 14.8405 4.70929 14.6561 4.26431C14.4718 3.81934 14.2015 3.41505 13.8609 3.07455Z'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          )}

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
