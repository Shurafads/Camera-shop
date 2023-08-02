import { useAppDispatch, useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { PRODUCTS_PER_PAGE } from '../../const';
import { getCurrentPage } from '../../store/search-data/search-data.selectors';
import classes from './card-list.module.css';
import { useEffect, useState } from 'react';
import { changeCurrentPage } from '../../store/search-data/search-data';
import { TProduct } from '../../types/product';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import ModalAddProductSuccess from '../modal-add-product-success/modal-add-product-success';
import { addProductToBasket } from '../../store/basket-data/basket-data';

export default function CardList() {

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const productsList = useAppSelector(getFiltredProductsList);

  const [modalAddState, setModalAddState] = useState(false);
  const [modalAddSuccessState, setModalAddSuccessState] = useState(false);
  const [currentBasketProduct, setCurrentBasketProduct] = useState<TProduct | null>(null);

  const lastProduct = PRODUCTS_PER_PAGE * currentPage;
  const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

  const paginationCount = Math.ceil(productsList.length / PRODUCTS_PER_PAGE);
  const productsOnPage = productsList.slice(firstProduct, lastProduct);

  useEffect(() => {

    if (currentPage > paginationCount) {
      dispatch(changeCurrentPage(paginationCount));
    }
    if (!paginationCount) {
      dispatch(changeCurrentPage(1));
    }

  },[currentPage, paginationCount, dispatch]);

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
      <div className="cards catalog__cards" data-testid="card-list">
        {productsOnPage.length < 1 && <h2 className={`title ${classes.title}`}>По вашему запросу ничего не найдено</h2>}
        {productsOnPage.map((product) => <Card key={product.id} product={product} onBuyClick={handleBuyClick}/>)}
      </div>

      <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseAddModalClick} currentBasketProduct={currentBasketProduct} onSubmitClick={handleSuccessModalSubmit}/>
      <ModalAddProductSuccess isActive={modalAddSuccessState} onCloseClick={handleCloseSuccessModalClick}/>
    </>

  );
}
