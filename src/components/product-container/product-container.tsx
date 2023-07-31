import ReactFocusLock from 'react-focus-lock';
import { STARS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProductInfo } from '../../store/products-data/products-data.selectors';
import ProductInfo from '../product-info/product-info';
import Star from '../star/star';
import ModalAddProductSuccess from '../modal-add-product-success/modal-add-product-success';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import { MouseEvent, useEffect, useState } from 'react';
import { addProductToBasket } from '../../store/basket-data/basket-data';

export default function ProductContainer() {

  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getProductInfo);

  const [modalAddState, setModalAddState] = useState(false);
  const [modalAddSuccessState, setModalAddSuccessState] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!modalAddState && !modalAddSuccessState && isMounted) {
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

  if (!currentProduct) {
    return null;
  }

  const getFilledStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-full-star'}/>);
  const getEmptyStars = (number: number) => Array.from({length: number}).map((item, index) => <Star key={String(index + 1)} starHref={'#icon-star'}/>);
  const emptyStarsCount = STARS_COUNT - Math.round(currentProduct.rating);

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseAddModalClick();
      handleCloseSuccessModalClick();
    }
  };

  const handleBuyClick = () => {
    setModalAddState(true);
  };

  const handleCloseAddModalClick = (evt?: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    evt?.preventDefault();
    setModalAddState(false);
  };

  const handleSuccessModalSubmit = () => {
    setModalAddState(false);
    dispatch(addProductToBasket(currentProduct));

    setModalAddSuccessState(true);
  };

  const handleCloseSuccessModalClick = () => {
    setModalAddSuccessState(false);
  };

  return (
    <>
      <section className="product" data-testid="product-container">
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
              {getFilledStars(Math.round(currentProduct.rating))}
              {getEmptyStars(emptyStarsCount)}
              <p className="visually-hidden">Рейтинг: 4</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{currentProduct.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{currentProduct.price.toLocaleString()} ₽</p>
            <button className="btn btn--purple" type="button" onClick={handleBuyClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <ProductInfo />
          </div>
        </div>
      </section>

      <ReactFocusLock>
        <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseAddModalClick} currentBasketProduct={currentProduct} onSubmitClick={handleSuccessModalSubmit}/>
        <ModalAddProductSuccess isActive={modalAddSuccessState} onCloseClick={handleCloseSuccessModalClick}/>
      </ReactFocusLock>
    </>
  );
}
