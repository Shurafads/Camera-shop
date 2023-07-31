import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-action';
import { Link, useParams } from 'react-router-dom';
import Slider from '../../components/slider/slider';
import { AppRoute } from '../../const';
import { getIsLoadingProducInfo, getProductInfo } from '../../store/products-data/products-data.selectors';
import ProductContainer from '../../components/product-container/product-container';
import ReviewContainer from '../../components/review-container/review-container';
import LoadingPage from '../loading-page/loading-page';
import { scrollWindowToTop } from '../../utils/utils';

export default function ProductPage() {

  const dispatch = useAppDispatch();
  const param = useParams();
  const currentProduct = useAppSelector(getProductInfo);
  const isLoadingProducInfo = useAppSelector(getIsLoadingProducInfo);

  useEffect(() => {
    let isMounted = true;

    if (param.id && isMounted) {
      dispatch(fetchProductAction(param.id));
      dispatch(fetchReviewsAction(param.id));
      dispatch(fetchSimilarProductsAction(param.id));
    }

    return () => {
      isMounted = false;
    };
  }, [param.id, dispatch]);

  if (!currentProduct || isLoadingProducInfo) {
    return <LoadingPage />;
  }

  const handleUpButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    scrollWindowToTop();
  };

  return (
    <>
      <main>
        <div className="page-content" data-testid="prouct-page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
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
                  <span className="breadcrumbs__link breadcrumbs__link--active">{currentProduct.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <ProductContainer/>
          </div>
          <div className="page-content__section">
            <Slider/>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <ReviewContainer />
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header" onClick={handleUpButtonClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>
  );
}
