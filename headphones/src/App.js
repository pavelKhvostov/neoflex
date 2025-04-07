import { Header } from './pages/Header';
import { Home } from './pages/Home';

import headphones from './assets/headphones.json';
import { Footer } from './pages/Footer';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Header />

        <main>
          <Home headphones={headphones} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
