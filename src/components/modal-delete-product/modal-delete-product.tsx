import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TProduct } from '../../types/product';

type ModalDeleteProductProps = {
  isActive: boolean;
  onCloseModal: () => void;
  currentProduct: TProduct | null;
  onDeleteProduct: () => void;
};

export default function ModalDeleteProduct({isActive, onCloseModal, currentProduct, onDeleteProduct}: ModalDeleteProductProps) {

  const modalclassName = isActive ? 'modal is-active' : 'modal';

  if (!currentProduct) {
    return null;
  }

  return (
    <div className={modalclassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModal}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${currentProduct.previewImgWebp}, /${currentProduct.previewImgWebp2x}`}/>
                <img src={`/${currentProduct.previewImg}`} srcSet={`/${currentProduct.previewImg2x}`} width="280" height="240" alt={currentProduct.name}/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{currentProduct.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{currentProduct.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{currentProduct.type}</li>
                <li className="basket-item__list-item">{currentProduct.level}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={onDeleteProduct}>
              Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to={AppRoute.Basket}
              onClick={onCloseModal}
            >
              Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModal}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
