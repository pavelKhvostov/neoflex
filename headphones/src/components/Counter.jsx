import { useEffect, useState } from 'react';
import { safeGet, safeSet, safeRemove } from '../utils/storageUtils';

export function Counter({
  setIsActive,
  id,
  onClickAddItem,
  onClickRemoveItem,
  title,
  imageUrl,
  price,
  rate,
}) {
  const [count, setCount] = useState(() => {
    const savedCount = safeGet(`count_${id}`, 0);
    return savedCount ? Number(savedCount) : 1;
  });

  const onClickPlus = () => {
    const newCount = count + 1;
    setCount(newCount);
    safeSet(`count_${id}`, newCount);
  };

  const handleClickPlus = (e) => {
    e.stopPropagation();
    const item = { title, imageUrl, price, rate, id };
    onClickAddItem(item);
    onClickPlus();
  };

  const handleClicMinus = (e) => {
    e.stopPropagation();
    const item = { title, imageUrl, price, rate, id };
    onClickRemoveItem(item);
    onClickMinus();
  };

  const onClickMinus = () => {
    if (count <= 1) {
      setIsActive(false);
      safeRemove(`count_${id}`);
      safeRemove(`isActive_${id}`);
    } else {
      const newCount = count - 1;
      setCount(newCount);
      safeSet(`count_${id}`, newCount);
    }
  };

  useEffect(() => {
    const savedCount = safeGet(`count_${id}`, 0);
    if (savedCount) {
      setCount(Number(savedCount));
    }
  }, [id]);

  useEffect(() => {
    safeSet(`count_${id}`, count);
  }, [count, id]);

  return (
    <div className='counter'>
      <button onClick={(e) => handleClicMinus(e)} type='button' className='counter__wrap'>
        <svg
          width='14'
          height='2'
          viewBox='0 0 14 2'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M0 0H14V2H0V0Z' fill='white' />
        </svg>
      </button>
      <span className='counter__count'>{count}</span>
      <button onClick={(e) => handleClickPlus(e)} type='button' className='counter__wrap'>
        <svg
          width='15'
          height='14'
          viewBox='0 0 15 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.20557 6V0H8.20557V6H14.2056V8H8.20557V14H6.20557V8H0.205566V6H6.20557Z'
            fill='white'
          />
        </svg>
      </button>
    </div>
  );
}
