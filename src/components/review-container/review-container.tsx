import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { getReviewsList } from '../../store/reviews-data/reviews-data.selectors';
import Review from '../review/review';
import { DEFAULT_REVIEW_COUNT } from '../../const';
import { getProductInfo } from '../../store/products-data/products-data.selectors';
import ReactFocusLock from 'react-focus-lock';
import ModalReview from '../modal-review/modal-review';
import ModalSuccess from '../modal-success/modal-success';

export default function ReviewContainer() {

  const reviewList = useAppSelector(getReviewsList);
  const currentProduct = useAppSelector(getProductInfo);

  const [reviewCount, setReviewCount] = useState(DEFAULT_REVIEW_COUNT);
  const [modalSuccessState, setModalSuccessState] = useState(false);
  const [modalReviewState, setModalReviewState] = useState(false);

  const isButtonVisible = reviewList.length > reviewCount;
  const slicedReviewList = reviewList.slice(0, reviewCount).map((review) => <Review key={review.id} review={review}/>);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setReviewCount(DEFAULT_REVIEW_COUNT);
    }

    return () => {
      isMounted = false;
    };

  }, [currentProduct]);

  useEffect(() => {
    let isMounted = true;

    if (!modalReviewState && !modalSuccessState && isMounted) {
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

  const handleButtonClick = () => {
    setReviewCount((prevState) => prevState + DEFAULT_REVIEW_COUNT);
  };

  const handleReviewModalSubmit = () => {
    setModalReviewState(false);
    setModalSuccessState(true);
  };

  const handleSuccessModalClose = () => {
    setModalSuccessState(false);
  };

  const handleFeedbackButtonClick = () => {
    setModalReviewState(true);
  };

  const handleReviewModalClose = () => {
    setModalReviewState(false);
  };

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleReviewModalClose();
      handleSuccessModalClose();
    }
  };

  return (
    <>
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button" onClick={handleFeedbackButtonClick}>Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {reviewList.length < 1 ? <p style={{margin: 'auto'}}>У товара еще нет отзывов</p> : slicedReviewList}
        </ul>
        <div className="review-block__buttons">
          <button
            className={isButtonVisible ? 'btn btn--purple' : 'visually-hidden'}
            type="button"
            onClick={handleButtonClick}
          >
            Показать больше отзывов
          </button>
        </div>
      </div>

      <ReactFocusLock disabled={!modalReviewState} returnFocus>
        <ModalReview isActive={modalReviewState} onCloseModal={handleReviewModalClose} onSubmitModal={handleReviewModalSubmit}/>
      </ReactFocusLock>
      <ReactFocusLock disabled={!modalSuccessState} returnFocus>
        <ModalSuccess isActive={modalSuccessState} onCloseModal={handleSuccessModalClose}/>
      </ReactFocusLock>
    </>
  );
}
