import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { scrollWindowToTop } from '../../utils/utils';

export default function Footer() {

  const [searchParams] = useSearchParams();

  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer__info">
          <a className="footer__logo" href="index.html" aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </a>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </Link>
            </li>
            <li className="social__item">
              <Link className="link" to="#" aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  className="link"
                  to={{
                    pathname: AppRoute.Catalog,
                    search: searchParams.toString()
                  }}
                  onClick={() => scrollWindowToTop()}
                >
                  Каталог
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/garanty">Гарантии
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/delivery">Доставка
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/about">О компании
                </Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to="/courses">Курсы операторов
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/blog">Блог
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/community">Сообщество
                </Link>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="link" to="/faq">FAQ
                </Link>
              </li>
              <li className="footer__item">
                <Link className="link" to="/question">Задать вопрос
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
