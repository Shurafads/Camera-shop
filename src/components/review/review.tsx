import dayjs from 'dayjs';
import { TReview } from '../../types/review';
import localeRu from 'dayjs/locale/ru';
import Star from '../star/star';
import { nanoid } from 'nanoid';
import { STARS_COUNT } from '../../const';

type ReviewProps = {
  review: TReview;
}

export default function Review({review}: ReviewProps) {

  const dateReview = dayjs(review.createAt).locale(localeRu).format('D MMMM');
  const dateTimeReview = dayjs(review.createAt).format('YYYY-MM-DD');

  const filledStars = (number: number) => Array.from({length: number}).map(() => <Star key={nanoid()} starHref={'#icon-full-star'}/>);
  const emptyStars = (number: number) => Array.from({length: number}).map(() => <Star key={nanoid()} starHref={'#icon-star'}/>);
  const emptyStarsCount = STARS_COUNT - review.rating;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={dateTimeReview}>{dateReview}</time>
      </div>
      <div className="rate review-card__rate">
        {filledStars(review.rating)}
        {emptyStars(emptyStarsCount)}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
