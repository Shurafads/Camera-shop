import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import Search from '../search/search';
import { useAppSelector } from '../../store';
import { getBasketList } from '../../store/basket-data/basket-data.selectors';
import { getProductsCount } from '../../utils/utils';

export default function Header() {

  const [searchParams] = useSearchParams();
  const basketList = useAppSelector(getBasketList);

  const productsCount = getProductsCount(basketList);

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
                className="main-nav__link"
                to={{
                  pathname: AppRoute.Catalog,
                  search: searchParams.toString()
                }}
                end
              >
                Каталог
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className="main-nav__link"
                to="/garanty"
              >
                Гарантии
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className="main-nav__link"
                to="/delivery"
              >
                Доставка
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                className="main-nav__link"
                to="/about"
              >
                О компании
              </NavLink>
            </li>
          </ul>
        </nav>
        <Search />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketList && basketList.length > 0 && <span className="header__basket-count">{productsCount}</span>}
        </Link>
      </div>
    </header>
  );
}
