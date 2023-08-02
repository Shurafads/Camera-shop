import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../store';
import { closeSuccessPopup } from '../../store/basket-data/basket-data';
import { useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';

type ModalBasketSuccessProps = {
  isActive: boolean;
}

export default function ModalBasketSuccess({isActive}: ModalBasketSuccessProps) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const modalclassName = isActive ? 'modal modal--narrow is-active' : 'modal modal--narrow';

  useEffect(() => {
    let isMounted = true;

    if (!isActive && isMounted) {
      return;
    }

    if (isMounted) {
      document.addEventListener('keydown', handleEscapeKeydown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
      isMounted = false;
    };
  });

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(closeSuccessPopup());
    }
  };

  const handleButtonClick = () => {
    dispatch(closeSuccessPopup());
    navigate(AppRoute.Catalog);
  };

  const handleCloseClick = () => {
    dispatch(closeSuccessPopup());
  };

  return (
    <ReactFocusLock disabled={!isActive} returnFocus>
      <div className={modalclassName}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonClick}>
                Вернуться к покупкам
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleCloseClick}>
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
