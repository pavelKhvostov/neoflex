import { Link } from 'react-router-dom';
import { Social } from './Social';

export function Footer({ setContactModal }) {
  return (
    <footer className='footer'>
      <h2 className='footer__logo'>QPICK</h2>
      <div className='footer__mid'>
        <ul className='footer__nav'>
          <li className='footer__item'>
            <a href='#' className='footer__link'>
              Избранное
            </a>
          </li>
          <li className='footer__item'>
            <Link to='/order' className='footer__link'>
              Корзина
            </Link>
          </li>
          <li className='footer__item'>
            <a onClick={() => setContactModal(true)} href='#' className='footer__link'>
              Контакты
            </a>
          </li>
        </ul>
        <div className='footer__mid-wrap'>
          <a href='#' className='footer__link'>
            Условия сервиса
          </a>
          <div className='footer__lang'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.66666 9.99996C1.66666 14.6025 5.3975 18.3333 10 18.3333C14.6025 18.3333 18.3333 14.6025 18.3333 9.99996C18.3333 5.39746 14.6025 1.66663 10 1.66663C5.3975 1.66663 1.66666 5.39746 1.66666 9.99996Z'
                stroke='#838383'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M10.8333 1.70825C10.8333 1.70825 13.3333 4.99992 13.3333 9.99992C13.3333 14.9999 10.8333 18.2916 10.8333 18.2916'
                stroke='#838383'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.16666 18.2916C9.16666 18.2916 6.66666 14.9999 6.66666 9.99992C6.66666 4.99992 9.16666 1.70825 9.16666 1.70825'
                stroke='#838383'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.19167 12.9166H17.8083'
                stroke='#838383'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.19167 7.08325H17.8083'
                stroke='#838383'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <button className='footer__lang-btn footer__lang-btn--active'>Рус</button>
            <button className='footer__lang-btn'>Eng</button>
          </div>
        </div>
      </div>

      <Social />
    </footer>
  );
}
