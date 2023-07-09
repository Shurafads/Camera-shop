import { Link } from 'react-router-dom';
import { TProduct } from '../../types/product';
import { AppRoute, ProductTab, STARS_COUNT } from '../../const';
import { WindowScrollToTop } from '../../utils/utils';
import Star from '../star/star';

type CardProps = {
  product: TProduct;
  className?: string;
  style?: {width: string};
  onBuyClick: () => void;
}

export default function Card({product, className, style, onBuyClick}: CardProps) {

  const filledStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-full-star'}/>);
  const emptyStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-star'}/>);
  const emptyStarsCount = STARS_COUNT - Math.round(product.rating);

  return (
    <div className={className ? `product-card ${className}` : 'product-card'} style={style}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}/>
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x}`} width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {filledStars(Math.round(product.rating))}
          {emptyStars(emptyStarsCount)}
          <p className="visually-hidden">Рейтинг: </p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={onBuyClick}>Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}?tab=${ProductTab.Description}`} onClick={() => WindowScrollToTop()}>Подробнее
        </Link>
      </div>
    </div>
  );
}
