import ReactFocusLock from 'react-focus-lock';
import { TProduct } from '../../types/product';

type ModalAddProductProps = {
  isActive: boolean;
  onCloseClick: () => void;
  currentBasketProduct: TProduct | null;
  onSubmitClick: () => void;
}

export default function ModalAddProduct({isActive, onCloseClick, currentBasketProduct, onSubmitClick}: ModalAddProductProps) {

  if (!currentBasketProduct) {
    return null;
  }

  const modalclassNameName = isActive ? 'modal is-active' : 'modal';

  return (
    <ReactFocusLock disabled={!isActive} returnFocus>
      <div className={modalclassNameName}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${currentBasketProduct.previewImgWebp}, /${currentBasketProduct.previewImgWebp2x}`}/>
                  <img src={`/${currentBasketProduct.previewImg}`} srcSet={`/${currentBasketProduct.previewImg2x}`} width="280" height="240" alt={currentBasketProduct.name}/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{currentBasketProduct.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">O78DFGSD832</span>
                  </li>
                  <li className="basket-item__list-item">{currentBasketProduct.type}</li>
                  <li className="basket-item__list-item">{currentBasketProduct.level}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>{currentBasketProduct.price.toLocaleString()}
                  ₽
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onSubmitClick}>
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
