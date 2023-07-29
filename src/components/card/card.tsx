import { Link, useNavigate } from 'react-router-dom';
import { TProduct } from '../../types/product';
import { AppRoute, ProductTab, STARS_COUNT } from '../../const';
import { scrollWindowToTop } from '../../utils/utils';
import Star from '../star/star';
import { useAppSelector } from '../../store';
import { getBasketList } from '../../store/basket-data/basket-data.selectors';

type CardProps = {
  product: TProduct;
  className?: string;
  style?: {width: string};
  onBuyClick: (product: TProduct) => void;
}

export default function Card({product, className, style, onBuyClick}: CardProps) {

  const navigate = useNavigate();
  const basketList = useAppSelector(getBasketList);
  const isProductInBasket = basketList.find((item) => item.id === product.id);

  const getFilledStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-full-star'}/>);
  const getEmptyStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-star'}/>);
  const emptyStarsCount = STARS_COUNT - Math.round(product.rating);

  return (
    <div className={className ? `product-card ${className}` : 'product-card'} style={style}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}/>
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x}`} width="280" height="240" alt={product.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getFilledStars(Math.round(product.rating))}
          {getEmptyStars(emptyStarsCount)}
          <p className="visually-hidden">Рейтинг: </p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {
          isProductInBasket
            ?
            <button className="btn btn--purple-border product-card__btn product-card__btn--in-cart" type="button" onClick={() => {navigate(AppRoute.Basket); scrollWindowToTop();}}>В корзине</button>
            :
            <button className="btn btn--purple product-card__btn" type="button" onClick={() => onBuyClick(product)}>Купить</button>
        }
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}?tab=${ProductTab.Description}`} onClick={() => scrollWindowToTop()}>Подробнее
        </Link>
      </div>
    </div>
  );
}
