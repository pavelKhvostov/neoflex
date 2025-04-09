import { Card } from '../components/Card';

export function Home({ items, isLoading, onClickAddItem, onClickRemoveItem, onClickItemToModal }) {
  return (
    <section className='items'>
      <h1 className='visually-hidden'>купить наушники</h1>
      <h2 className='items__title'>Наушники</h2>
      <div className='items__wrap'>
        {(isLoading ? [...Array(6)] : items).map((item, index) => {
          return (
            <Card
              key={isLoading ? index : item.id}
              onClickAddItem={onClickAddItem}
              onClickRemoveItem={onClickRemoveItem}
              isLoading={isLoading}
              onClickItemToModal={onClickItemToModal}
              {...item}
            />
          );
        })}
      </div>
    </section>
  );
}
