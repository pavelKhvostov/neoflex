import { Card } from '../components/Card';

export function Favorite({
  favoriteItem,
  isLoading,
  onClickAddItem,
  onClickRemoveItem,
  onClickItemToModal,
  toggleFavorite,
}) {
  return (
    <section className='items'>
      <h2 className='items__title'>Мне нравится</h2>
      {!isLoading && favoriteItem.length === 0 && (
        <p className='items__decr-empty'>Нет избранных товаров</p>
      )}
      <div className='items__wrap'>
        {(isLoading ? [...Array(6)] : favoriteItem).map((item, index) => {
          return (
            <Card
              key={isLoading ? index : item.id}
              onClickAddItem={onClickAddItem}
              onClickRemoveItem={onClickRemoveItem}
              isLoading={isLoading}
              onClickItemToModal={onClickItemToModal}
              toggleFavorite={toggleFavorite}
              isActiveInFavorite={true}
              {...item}
            />
          );
        })}
      </div>
    </section>
  );
}
