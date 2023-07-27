import { useEffect, useState } from 'react';
import CardList from '../card-list/card-list';
import Filters from '../filters/filters';
import Pagination from '../pagination/pagiantion';
import Sort from '../sort/sort';
import { useAppDispatch, useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import ReactFocusLock from 'react-focus-lock';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import { TProduct } from '../../types/product';
import ModalAddProductSuccess from '../modal-add-product-success/modal-add-product-success';
import { addProductToBasket } from '../../store/basket-data/basket-data';

export default function CatalogContainer() {

  const dispatch = useAppDispatch();
  const productList = useAppSelector(getFiltredProductsList);

  const [modalAddState, setModalAddState] = useState(false);
  const [modalAddSuccessState, setModalAddSuccessState] = useState(false);
  const [currentBasketProduct, setCurrentBasketProduct] = useState<TProduct | null>(null);

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

  const handleEscapeKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseAddModalClick();
      handleCloseSuccessModalClick();
    }
  };

  const handleBuyClick = (product: TProduct) => {
    setModalAddState(true);
    setCurrentBasketProduct(product);
  };

  const handleCloseAddModalClick = () => {
    setModalAddState(false);
  };

  const handleCloseSuccessModalClick = () => {
    setModalAddSuccessState(false);
  };

  const handleSuccessModalSubmit = () => {
    setModalAddState(false);
    if (currentBasketProduct) {
      dispatch(addProductToBasket(currentBasketProduct));
    }
    setModalAddSuccessState(true);
    setCurrentBasketProduct(null);
  };

  return (
    <>
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <div className="catalog__aside">
              <Filters />
            </div>
            <div className="catalog__content">
              <Sort />
              <CardList onBuyClick={handleBuyClick}/>
              {productList.length > 1 && <Pagination />}
            </div>
          </div>
        </div>
      </section>
      <ReactFocusLock>
        <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseAddModalClick} currentBasketProduct={currentBasketProduct} onSubmitClick={handleSuccessModalSubmit}/>
        <ModalAddProductSuccess isActive={modalAddSuccessState} onCloseClick={handleCloseSuccessModalClick}/>
      </ReactFocusLock>
    </>
  );
}
