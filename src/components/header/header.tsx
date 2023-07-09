import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import Search from '../search/search';

export default function Header() {

  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link className="header__logo" to="/" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'main-nav__link main-nav__link--active' : 'main-nav__link'}
                to={`${AppRoute.Catalog}`}
                style={({ isActive }) => isActive ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
                end
              >
                Каталог
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'main-nav__link main-nav__link--active' : 'main-nav__link'}
                to="/garanty"
                style={({ isActive }) => isActive ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
              >
                Гарантии
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'main-nav__link main-nav__link--active' : 'main-nav__link'}
                to="/delivery"
                style={({ isActive }) => isActive ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
              >
                Доставка
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'main-nav__link main-nav__link--active' : 'main-nav__link'}
                to="/about"
                style={({ isActive }) => isActive ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
              >
                О компании
              </NavLink>
            </li>
          </ul>
        </nav>
        <Search />
        <Link className="header__basket-link" to="*">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}
