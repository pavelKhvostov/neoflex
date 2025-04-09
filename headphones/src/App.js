import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import headphones from './assets/headphones.json';
import { Footer } from './components/Footer';
import { useEffect, useState } from 'react';
import { Order } from './pages/Order';
import { Modal } from './components/Modal';
import { FormOrder } from './components/FormOrder';

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
      localStorage.setItem('orderCounts', JSON.stringify(updated));
      return updated;
    });
    setOrders((prevOrders) => {
      const alreadyExists = prevOrders.some((order) => order.id === item.id);
      if (!alreadyExists) {
        const updated = [...prevOrders, item];
        localStorage.setItem('orders', JSON.stringify(updated));
        return updated;
      }
      return prevOrders;
    });
    setTotalPrice((prev) => {
      const updatedTotalPrice = prev + item.price;
      localStorage.setItem('totelPrice', JSON.stringify(updatedTotalPrice));
      return updatedTotalPrice;
    });
  };

  const onClickRemoveItemNow = (item) => {
    setOrderCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[item.id];
      localStorage.setItem('orderCounts', JSON.stringify(updatedCounts));
      return updatedCounts;
    });
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((i) => i.id !== item.id);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    setTotalPrice((prevPrice) => {
      console.log(prevPrice);
      const updatedPrice = prevPrice - orderCounts[item.id] * item.price;
      console.log(updatedPrice);
      localStorage.setItem('totelPrice', JSON.stringify(updatedPrice));
      return updatedPrice;
    });
    setIsActive(false);
    localStorage.removeItem(`count_${item.id}`);
    localStorage.setItem(`isActive_${item.id}`, 'false');
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

      localStorage.setItem('orderCounts', JSON.stringify(updatedCounts));
      return updatedCounts;
    });

    setOrders((prevOrders) => {
      const count = orderCounts[item.id];
      if (count <= 1) {
        const updatedOrders = prevOrders.filter((i) => i.id !== item.id);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        return updatedOrders;
      }
      return prevOrders;
    });
    setTotalPrice((prev) => {
      const updatedTotalPrice = prev - item.price;
      localStorage.setItem('totelPrice', JSON.stringify(updatedTotalPrice));
      return updatedTotalPrice;
    });
  };

  useEffect(() => {
    localStorage.setItem('headphones', JSON.stringify(headphones));

    setTimeout(() => {
      const newItems = JSON.parse(localStorage.getItem('headphones')) || [];
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const savedOrderCounts = JSON.parse(localStorage.getItem('orderCounts')) || {};
      const savedTotalPrice = JSON.parse(localStorage.getItem('totelPrice')) || 0;

      setItems(newItems);
      setOrders(savedOrders);
      setOrderCounts(savedOrderCounts);
      setTotalPrice(savedTotalPrice);

      const newTotalCount = Object.values(savedOrderCounts).reduce((acc, sum) => acc + sum, 0);
      localStorage.setItem('totalCount', JSON.stringify(newTotalCount));

      setTotalCount(newTotalCount);

      seiIsLoading(false);
    }, 5000); // имитацию загрузки данных с сервера.
  }, []);

  useEffect(() => {
    let updatetotalCount = Object.values(orderCounts).reduce((acc, sum) => acc + sum, 0);
    localStorage.setItem('totalCount', JSON.stringify(updatetotalCount));
    setTotalCount(updatetotalCount);
  }, [orderCounts]);

  return (
    <div className='App'>
      <div className='container'>
        <Header totalCount={totalCount} />

        <Routes>
          <Route
            path='/'
            element={
              <main>
                <Home
                  isLoading={isLoading}
                  onClickRemoveItem={onClickRemoveItem}
                  onClickAddItem={onClickAddItem}
                  onClickItemToModal={onClickItemToModal}
                  items={items}
                />
              </main>
            }
          />
          <Route
            path='/order'
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

        <Footer />
      </div>
      <Modal active={modalActive} setActive={setModalActive} selectedItem={selectedItem} />
      <Modal active={modalOrder} setActive={setModalOrder}>
        <FormOrder />
      </Modal>
    </div>
  );
}

export default App;
