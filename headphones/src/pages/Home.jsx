import { Card } from '../components/Card';

export function Home({
  items,
  isLoading,
  onClickAddItem,
  onClickRemoveItem,
  onClickItemToModal,
  toggleFavorite,
}) {
  const wirelessHeadPhones = items.filter((item) => item.wireless === true);
  const wiredHeadphones = items.filter((item) => item.wireless === false);

  return (
    <section className='items'>
      <h1 className='visually-hidden'>купить наушники</h1>
      <div className='items__top'>
        <h2 className='items__title'>Наушники</h2>
        <div className='items__wrap'>
          {(isLoading ? [...Array(6)] : wiredHeadphones).map((item, index) => {
            return (
              <Card
                key={isLoading ? index : item.id}
                onClickAddItem={onClickAddItem}
                onClickRemoveItem={onClickRemoveItem}
                isLoading={isLoading}
                onClickItemToModal={onClickItemToModal}
                toggleFavorite={toggleFavorite}
                {...item}
              />
            );
          })}
        </div>
      </div>
      <div className='items__bottom'>
        <h2 className='items__title'>Беcпроводные наушники</h2>
        <div className='items__wrap'>
          {(isLoading ? [...Array(6)] : wirelessHeadPhones).map((item, index) => {
            return (
              <Card
                key={isLoading ? index : item.id}
                onClickAddItem={onClickAddItem}
                onClickRemoveItem={onClickRemoveItem}
                isLoading={isLoading}
                onClickItemToModal={onClickItemToModal}
                toggleFavorite={toggleFavorite}
                {...item}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
