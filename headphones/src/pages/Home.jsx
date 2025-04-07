import { Card } from '../components/Card';

export function Home({ headphones }) {
  return (
    <section className='items'>
      <h1 className='visually-hidden'>купить наушники</h1>
      <h2 className='items__title'>Наушники</h2>
      <div className='items__wrap'>
        {headphones.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
