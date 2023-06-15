import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type ModalAddProductProps = {
  isActive: boolean;
  onCloseClick: (evt: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => void;
}

export default function ModalAddProduct({isActive, onCloseClick}: ModalAddProductProps) {

  const modalClassName = isActive ? 'modal modal--narrow is-active' : 'modal modal--narrow';

  return (
    <div className={modalClassName}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to="#" onClick={onCloseClick}>Продолжить покупки</Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={onCloseClick}>Перейти в корзину</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
