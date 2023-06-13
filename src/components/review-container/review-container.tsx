import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { getReviewsList } from '../../store/reviews-data/reviews-data.selectors';
import Review from '../review/review';
import { DEFAULT_REVIEW_COUNT } from '../../const';
import { getProductInfo } from '../../store/products-data/products-data.selectors';

type ReviewContainerProps = {
  onClickFeedbackButton: () => void;
}

export default function ReviewContainer({onClickFeedbackButton}: ReviewContainerProps) {

  const reviewList = useAppSelector(getReviewsList);
  const currentProduct = useAppSelector(getProductInfo);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setReviewCount(DEFAULT_REVIEW_COUNT);
    }

    return () => {
      isMounted = false;
    };

  }, [currentProduct]);

  const [reviewCount, setReviewCount] = useState(DEFAULT_REVIEW_COUNT);

  const isButtonVisible = reviewList.length > reviewCount;

  const handleButtonClick = () => {
    setReviewCount((prevState) => prevState + DEFAULT_REVIEW_COUNT);
  };

  return (
    <div className="container">
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button" onClick={onClickFeedbackButton}>Оставить свой отзыв</button>
      </div>
      <ul className="review-block__list">
        {reviewList.length < 1 ? <p style={{margin: 'auto'}}>У товара еще нет отзывов</p> : reviewList.slice(0, reviewCount).map((review) => <Review key={review.id} review={review}/>)}
      </ul>
      <div className="review-block__buttons">
        <button
          className="btn btn--purple"
          type="button" style={isButtonVisible ? {display: 'block'} : {display: 'none'}}
          onClick={handleButtonClick}
        >
          Показать больше отзывов
        </button>
      </div>
    </div>
  );
}
