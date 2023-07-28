import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { WindowScrollToTop } from '../../utils/utils';

type ModalAddProductSuccessProps = {
  isActive: boolean;
  onCloseClick: () => void;
}

export default function ModalAddProductSuccess({isActive, onCloseClick}: ModalAddProductSuccessProps) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const modalClassName = isActive ? 'modal modal--narrow is-active' : 'modal modal--narrow';

  const handleButtonClick = () => {
    onCloseClick();
    navigate(AppRoute.Basket);
    WindowScrollToTop();
  };

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
            <Link
              className="btn btn--transparent modal__btn"
              to={{
                pathname: AppRoute.Catalog,
                search: searchParams.toString()
              }}
              onClick={onCloseClick}
            >
              Продолжить покупки
            </Link>
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={handleButtonClick}
            >
              Перейти в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button" aria-label="Закрыть попап"
            onClick={onCloseClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
