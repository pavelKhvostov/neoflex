import headphones from './assets/headphones.json';

function App() {
  return (
    <div className='App'>
      <h1 className='title'>Список наушников</h1>
      {headphones.map((item) => {
        return (
          <div
            key={item.id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
          >
            <img src={item.imageUrl} alt={item.title} style={{ width: '100px' }} />
            <h2>{item.title}</h2>
            <p>Цена: {item.price}₽</p>
            <p>Рейтинг: {item.rate}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
