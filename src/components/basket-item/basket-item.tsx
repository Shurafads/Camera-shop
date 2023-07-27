import { useRef } from 'react';
import { useAppDispatch } from '../../store';
import { TProduct } from '../../types/product';
import { changeProductCount, decreaseProductCount, increaseProductCount } from '../../store/basket-data/basket-data';
import { MAX_PRODUCT_COUNT, MIN_PRODUCT_COUNT } from '../../const';

type BasketItemProps = {
  product: TProduct;
  onDeleteClick: (product: TProduct) => void;
}

export default function BasketItem({product, onDeleteClick}: BasketItemProps) {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const totalItemPrice = product.count ? product.count * product.price : MIN_PRODUCT_COUNT * product.price;

  const handleChangeProductCount = () => {

    if (inputRef.current) {

      if (+inputRef.current.value > MAX_PRODUCT_COUNT) {

        dispatch(changeProductCount({id: product.id, count: Math.round(MAX_PRODUCT_COUNT)}));
        return;
      }

      dispatch(changeProductCount({id: product.id, count: Math.round(+inputRef.current.value)}));
    }
  };

  const handleBlurProductCount = () => {

    if (inputRef.current && +inputRef.current.value < MIN_PRODUCT_COUNT) {
      dispatch(changeProductCount({id: product.id, count: Math.round(MIN_PRODUCT_COUNT)}));
    }
  };

  const HandleIncreaseButtonClick = () => {
    dispatch(increaseProductCount(product));
  };

  const HandleDecreaseButtonClick = () => {
    dispatch(decreaseProductCount(product));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x}`}/>
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x}`} width="280" height="240" alt={product.name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{product.type}</li>
          <li className="basket-item__list-item">{product.level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{product.price.toLocaleString()} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={product.count ? product.count <= MIN_PRODUCT_COUNT : false}
          onClick={HandleDecreaseButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          value={product.count || ''}
          aria-label="количество товара"
          onChange={handleChangeProductCount}
          onBlur={handleBlurProductCount}
          ref={inputRef}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={product.count ? product.count >= MAX_PRODUCT_COUNT : false}
          onClick={HandleIncreaseButtonClick}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{totalItemPrice.toLocaleString()} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => onDeleteClick(product)}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
