import { Social } from '../components/Social';

export function Footer() {
  return (
    <div className='footer'>
      <h2 className='footer__logo'>QPICK</h2>
      <ul className='footer__nav'>
        <li className='footer__item'>
          <a href='#' className='footer__link'>
            Избранное
          </a>
        </li>
        <li className='footer__item'>
          <a href='#' className='footer__link'>
            Корзина
          </a>
        </li>
        <li className='footer__item'>
          <a href='#' className='footer__link'>
            Контакты
          </a>
        </li>
      </ul>
      <Social />
    </div>
  );
}
