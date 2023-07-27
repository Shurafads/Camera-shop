import { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-action';
import { Link, useParams } from 'react-router-dom';
import Slider from '../../components/slider/slider';
import { AppRoute } from '../../const';
import { getIsLoadingProducInfo, getProductInfo } from '../../store/products-data/products-data.selectors';
import ProductContainer from '../../components/product-container/product-container';
import ReviewContainer from '../../components/review-container/review-container';
import ModalReview from '../../components/modal-review/modal-review';
import ModalSuccess from '../../components/modal-success/modal-success';
import ReactFocusLock from 'react-focus-lock';
import LoadingPage from '../loading-page/loading-page';
import { WindowScrollToTop } from '../../utils/utils';
import ModalAddProductSuccess from '../../components/modal-add-product-success/modal-add-product-success';
import ModalAddProduct from '../../components/modal-add-product/modal-add-product';
import { addProductToBasket } from '../../store/basket-data/basket-data';
import { TProduct } from '../../types/product';

export default function ProductPage() {

  const dispatch = useAppDispatch();
  const param = useParams();
  const currentProduct = useAppSelector(getProductInfo);
  const isLoadingProducInfo = useAppSelector(getIsLoadingProducInfo);

  const [modalReviewState, setModalReviewState] = useState(false);
  const [modalSuccessState, setModalSuccessState] = useState(false);

  const [modalAddState, setModalAddState] = useState(false);
  const [modalAddSuccessState, setModalAddSuccessState] = useState(false);
  const [currentBasketProduct, setCurrentBasketProduct] = useState<TProduct | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    if (!modalReviewState && !modalSuccessState && !modalAddState && !modalAddSuccessState && isMounted) {
      return;
    }

    if (isMounted) {
      document.addEventListener('keydown', handleEscapeKeydown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
      isMounted = false;
    };
  });

  if (!currentProduct || isLoadingProducInfo) {
    return <LoadingPage />;
  }

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleReviewModalClose();
      handleSuccessModalClose();
      handleCloseAddModalClick();
      handleCloseSuccessModalClick();
    }
  };

  const handleFeedbackButtonClick = () => {
    setModalReviewState(true);
  };

  const handleReviewModalClose = () => {
    setModalReviewState(false);
  };

  const handleReviewModalSubmit = () => {
    setModalReviewState(false);
    setModalSuccessState(true);
  };

  const handleSuccessModalClose = () => {
    setModalSuccessState(false);
  };

  const handleBuyClick = (product: TProduct) => {
    setModalAddState(true);
    setCurrentBasketProduct(product);
  };

  const handleCloseAddModalClick = (evt?: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    evt?.preventDefault();
    setModalAddState(false);
  };

  const handleUpButtonClick = (evt: MouseEvent) => {
    evt.preventDefault();
    WindowScrollToTop();
  };

  const handleSuccessModalSubmit = () => {
    setModalAddState(false);
    if (currentBasketProduct) {
      dispatch(addProductToBasket(currentBasketProduct));
    }

    setModalAddSuccessState(true);
    setCurrentBasketProduct(null);
  };

  const handleCloseSuccessModalClick = () => {
    setModalAddSuccessState(false);
  };

  return (
    <>
      <main>
        <div className="page-content" data-testid="product-content-page">
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
            <ProductContainer onBuyClick={handleBuyClick}/>
          </div>
          <div className="page-content__section">
            <Slider onBuyClick={handleBuyClick}/>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <ReviewContainer onClickFeedbackButton={handleFeedbackButtonClick} />
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header" onClick={handleUpButtonClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <ReactFocusLock>
        <ModalReview isActive={modalReviewState} onCloseModal={handleReviewModalClose} onSubmitModal={handleReviewModalSubmit}/>
        <ModalSuccess isActive={modalSuccessState} onCloseModal={handleSuccessModalClose}/>

        <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseAddModalClick} currentBasketProduct={currentBasketProduct} onSubmitClick={handleSuccessModalSubmit}/>
        <ModalAddProductSuccess isActive={modalAddSuccessState} onCloseClick={handleCloseSuccessModalClick}/>
      </ReactFocusLock>
    </>
  );
}
