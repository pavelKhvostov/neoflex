export function Modal({ active, setActive, selectedItem, children }) {
  return (
    <div className={active ? 'modal modal--active' : 'modal'} onClick={() => setActive(false)}>
      <div className='modal__content' onClick={(e) => e.stopPropagation()}>
        {children ? (
          children
        ) : (
          <>
            <img className='modal__img' src={selectedItem.imageUrl} alt='наушники' />
            <div className='modal__inner'>
              <h3 className='modal__title'>{selectedItem.title}</h3>
              <p className='modal__dect'>{selectedItem.decr}</p>
              <span className='modal__price'>{selectedItem.price} ₽</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
