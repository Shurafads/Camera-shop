import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketList from '../../components/basket-list/basket-list';
import BasketPromo from '../../components/basket-promo/basket-promo';
import BasketOrder from '../../components/basket-order/basket-order';
import LoadingPage from '../loading-page/loading-page';
import { useAppSelector } from '../../store';
import { getBasketList, getSendingOrderStatus } from '../../store/basket-data/basket-data.selectors';
import classes from './basket-page.module.css';

export default function BasketPage() {

  const isSendingOrder = useAppSelector(getSendingOrderStatus);
  const basketList = useAppSelector(getBasketList);

  if (isSendingOrder) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Корзина - фотошоп</title>
      </Helmet>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={'/'}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket" data-testid="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {!basketList.length && <h2 className={`title ${classes.title}`}>В корзине нет товаров</h2>}
              {basketList.length > 0 && <BasketList />}
              <div className="basket__summary">
                <BasketPromo />
                <BasketOrder />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
