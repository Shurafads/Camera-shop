import ReactFocusLock from 'react-focus-lock';

type ModalSuccessProps = {
  isActive: boolean;
  onCloseModal: () => void;
}

export default function ModalSuccess({isActive, onCloseModal}: ModalSuccessProps) {

  const modalClassName = isActive ? 'modal is-active modal--narrow' : 'modal modal--narrow';

  return (
    <ReactFocusLock disabled={!isActive} returnFocus>
      <div className={modalClassName}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={() => onCloseModal()}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={() => onCloseModal()}>Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => onCloseModal()}>
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
