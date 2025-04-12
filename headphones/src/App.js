import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { FormOrder } from './components/FormOrder';
import { Home } from './pages/Home';
import { Favorite } from './pages/Favorite';
import { Order } from './pages/Order';
import headphones from './assets/headphones.json';
import { safeGet, safeSet, safeRemove } from './utils/storageUtils';

function App() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, seiIsLoading] = useState(true);
  const [orderCounts, setOrderCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalOrder, setModalOrder] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [totalFvorite, setTotalFavorite] = useState(0);
  const [favoriteItem, setFavoriteItem] = useState([]);

  const toggleFavorite = (item) => {
    const storedFavorites = safeGet('favorite', []);
    const isFavorite = storedFavorites.some((fav) => fav.id === item.id);
    const updatedFavorites = isFavorite
      ? storedFavorites.filter((fav) => fav.id !== item.id)
      : [...storedFavorites, item];

    safeSet('favorite', updatedFavorites);
    safeSet('totalFavorite', updatedFavorites.length);

    setTotalFavorite(updatedFavorites.length);
    setFavoriteItem(updatedFavorites);
  };

  const onClickItemToModal = (item) => {
    setSelectedItem(item);
    setModalActive(true);
  };

  const onClickAddItem = (item) => {
    setOrderCounts((prevCounts) => {
      const updated = {
        ...prevCounts,
        [item.id]: (prevCounts[item.id] || 0) + 1,
      };
      safeSet('orderCounts', updated);
      return updated;
    });

    setOrders((prevOrders) => {
      const alreadyExists = prevOrders.some((order) => order.id === item.id);
      if (!alreadyExists) {
        const updated = [...prevOrders, item];
        safeSet('orders', updated);
        return updated;
      }
      return prevOrders;
    });

    setTotalPrice((prev) => {
      const updatedTotalPrice = prev + item.price;
      safeSet('totelPrice', updatedTotalPrice);
      return updatedTotalPrice;
    });
  };

  const onClickRemoveItemNow = (item) => {
    setOrderCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[item.id];
      safeSet('orderCounts', updatedCounts);
      return updatedCounts;
    });

    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((i) => i.id !== item.id);
      safeSet('orders', updatedOrders);
      return updatedOrders;
    });

    setTotalPrice((prevPrice) => {
      const updatedPrice = prevPrice - orderCounts[item.id] * item.price;
      safeSet('totelPrice', updatedPrice);
      return updatedPrice;
    });

    setIsActive(false);
    safeRemove(`count_${item.id}`);
    safeSet(`isActive_${item.id}`, false);
  };

  const onClickRemoveItem = (item) => {
    setOrderCounts((prevCounts) => {
      const currentCount = prevCounts[item.id] || -1;
      const updatedCounts = { ...prevCounts };

      if (currentCount <= 1) {
        delete updatedCounts[item.id];
      } else {
        updatedCounts[item.id] = currentCount - 1;
      }

      safeSet('orderCounts', updatedCounts);
      return updatedCounts;
    });

    setOrders((prevOrders) => {
      const count = orderCounts[item.id];
      if (count <= 1) {
        const updatedOrders = prevOrders.filter((i) => i.id !== item.id);
        safeSet('orders', updatedOrders);
        return updatedOrders;
      }
      return prevOrders;
    });

    setTotalPrice((prev) => {
      const updatedTotalPrice = prev - item.price;
      safeSet('totelPrice', updatedTotalPrice);
      return updatedTotalPrice;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      safeSet('headphones', headphones);

      const newItems = safeGet('headphones', []);
      const savedOrders = safeGet('orders', []);
      const savedOrderCounts = safeGet('orderCounts', {});
      const savedTotalPrice = safeGet('totelPrice', 0);
      const storedFavorites = safeGet('favorite', []);
      const totalFavorite = safeGet('totalFavorite', 0);

      setItems(newItems);
      setOrders(savedOrders);
      setFavoriteItem(storedFavorites);
      setOrderCounts(savedOrderCounts);
      setTotalPrice(savedTotalPrice);
      setTotalFavorite(totalFavorite);

      const newTotalCount = Object.values(savedOrderCounts).reduce((acc, sum) => acc + sum, 0);
      safeSet('totalCount', newTotalCount);
      setTotalCount(newTotalCount);

      seiIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updatedTotalCount = Object.values(orderCounts).reduce((acc, sum) => acc + sum, 0);
    safeSet('totalCount', updatedTotalCount);
    setTotalCount(updatedTotalCount);
  }, [orderCounts]);

  return (
    <div className='App'>
      <div className='container'>
        <Header totalCount={totalCount} totalFvorite={totalFvorite} />

        <Routes>
          <Route
            path=''
            element={
              <main>
                <Home
                  isLoading={isLoading}
                  onClickRemoveItem={onClickRemoveItem}
                  onClickAddItem={onClickAddItem}
                  onClickItemToModal={onClickItemToModal}
                  toggleFavorite={toggleFavorite}
                  items={items}
                />
              </main>
            }
          />
          <Route
            path='favorite'
            element={
              <main>
                <Favorite
                  isLoading={isLoading}
                  onClickRemoveItem={onClickRemoveItem}
                  onClickAddItem={onClickAddItem}
                  onClickItemToModal={onClickItemToModal}
                  toggleFavorite={toggleFavorite}
                  favoriteItem={favoriteItem}
                />
              </main>
            }
          />
          <Route
            path='order'
            element={
              <main>
                <Order
                  orders={orders}
                  totalPrice={totalPrice}
                  onClickRemoveItem={onClickRemoveItem}
                  onClickAddItem={onClickAddItem}
                  onClickRemoveItemNow={onClickRemoveItemNow}
                  onClickItemToModal={onClickItemToModal}
                  setModalOrder={setModalOrder}
                />
              </main>
            }
          />
        </Routes>

        <Footer setContactModal={setContactModal} />
      </div>

      <Modal active={modalActive} setActive={setModalActive} selectedItem={selectedItem} />
      <Modal active={modalOrder} setActive={setModalOrder}>
        <FormOrder orders={orders} totalPrice={totalPrice} />
      </Modal>
      <Modal active={contactModal} setActive={setContactModal}>
        <div className='contact'>
          <div className='contact__left'>
            <a href='tel:+79535795260' className='contact__link'>
              Контактый центр: <span className='contact__text'>+7(953)579 52-60</span>
            </a>
            <a href='mailto:pavel.khvostov@inbox.ru' className='contact__link'>
              По всем вопросам: <span className='contact__text'>pavel.khvostov@inbox.ru</span>
            </a>
          </div>
          <div className='contact__right'>
            Мы находимся:{' '}
            <iframe
              className='contact__frame'
              src='https://www.google.com/maps/embed?...'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
