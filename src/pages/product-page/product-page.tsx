import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProductAction, fetchReviewsAction, fetchSimilarProductsAction } from '../../store/api-action';
import { Link, useParams } from 'react-router-dom';
import Slider from '../../components/slider/slider';
import { AppRoute } from '../../const';
import { getProductInfo } from '../../store/products-data/products-data.selectors';
import ProductContainer from '../../components/product-container/product-container';
import ReviewContainer from '../../components/review-container/review-container';
import ModalReview from '../../components/modal-review/modal-review';
import ModalSuccess from '../../components/modal-success/modal-success';
import FocusLock from 'react-focus-lock';

export default function ProductPage() {

  const dispatch = useAppDispatch();
  const param = useParams();
  const currentProduct = useAppSelector(getProductInfo);

  const [modalReviewState, setModalReviewState] = useState(false);
  const [modalSuccessState, setModalSuccessState] = useState(false);

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

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleReviewModalClose();
      handleSuccessModalClose();
    }
  };

  useEffect(() => {
    if (!modalReviewState && !modalSuccessState) {
      return;
    }

    document.addEventListener('keydown', handleEscapeKeydown);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
    };

  });

  if (!currentProduct) {
    return null;
  }

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

  return (
    <>
      <main>
        <div className="page-content">
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
            <ProductContainer />
          </div>
          <div className="page-content__section">
            <Slider />
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <ReviewContainer onClickFeedbackButton={handleFeedbackButtonClick} />
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <FocusLock>
        <ModalReview isActive={modalReviewState} onCloseModal={handleReviewModalClose} onSubmitModal={handleReviewModalSubmit}/>
        <ModalSuccess isActive={modalSuccessState} onCloseModal={handleSuccessModalClose}/>
      </FocusLock>
    </>
  );
}
