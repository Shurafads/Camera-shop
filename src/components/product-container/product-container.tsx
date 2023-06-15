import { useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';
import ProductInfo from '../product-info/product-info';

type ProductContainerProps = {
  onBuyClick: () => void;
}


export default function ProductContainer({onBuyClick}: ProductContainerProps) {

  const currentProduct = useAppSelector(getProductInfo);

  if (!currentProduct) {
    return null;
  }

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${currentProduct.previewImgWebp}, /${currentProduct.previewImgWebp2x}`}/>
            <img src={`/${currentProduct.previewImg}`} srcSet={`/${currentProduct.previewImg2x}`} width="560" height="480" alt={currentProduct.name}/>
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{`${currentProduct.category} ${currentProduct.name}`}</h1>
          <div className="rate product__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 4</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{currentProduct.reviewCount}</p>
          </div>
          <p className="product__price"><span className="visually-hidden">Цена:</span>{currentProduct.price.toLocaleString()} ₽</p>
          <button className="btn btn--purple" type="button" onClick={onBuyClick}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <ProductInfo />
        </div>
      </div>
    </section>
  );
}
