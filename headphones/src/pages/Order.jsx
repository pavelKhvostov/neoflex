import { Card } from '../components/Card';

export function Order({
  orders,
  onClickRemoveItem,
  onClickAddItem,
  totalPrice,
  onClickRemoveItemNow,
  onClickItemToModal,
  setModalOrder,
}) {
  return (
    <section className='order'>
      <h2 className='order__title'>Корзина</h2>
      {orders.length > 0 ? (
        <div className='order__wrap'>
          <div className='order__left'>
            {orders.map((item) => {
              return (
                <Card
                  key={item.id}
                  isOrder={true}
                  onClickRemoveItem={onClickRemoveItem}
                  onClickAddItem={onClickAddItem}
                  onClickRemoveItemNow={onClickRemoveItemNow}
                  onClickItemToModal={onClickItemToModal}
                  {...item}
                />
              );
            })}
          </div>
          <div className='order__right'>
            <div className='order__relative'>
              <div className='order__inner-price'>
                <span className='order__text'>ИТОГО</span>
                <span className='order__price'>₽ {totalPrice}</span>
              </div>
              <button onClick={() => setModalOrder(true)} className='order__btn'>
                Перейти к оформлению
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className='order__decr'>Корзина пуста</p>
      )}
    </section>
  );
}
