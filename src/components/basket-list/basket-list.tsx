import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBasketList } from '../../store/basket-data/basket-data.selectors';
import BasketItem from '../basket-item/basket-item';
import ModalDeleteProduct from '../modal-delete-product/modal-delete-product';
import { TProduct } from '../../types/product';
import { removeProductFromBasket } from '../../store/basket-data/basket-data';

export default function BasketList() {

  const dispatch = useAppDispatch();

  const basketList = useAppSelector(getBasketList);

  const [modalState, setModalState] = useState(false);
  const [currentBasketProduct, setCurrentBasketProduct] = useState<TProduct | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!modalState && isMounted) {
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
      handleCloseModalClick();
    }
  };

  const handleCloseModalClick = () => {
    setModalState(false);
  };

  const handleDeleteClick = (product: TProduct) => {
    setCurrentBasketProduct(product);
    setModalState(true);
  };

  const handleModalDeleteClick = () => {
    setModalState(false);
    if (currentBasketProduct) {
      dispatch(removeProductFromBasket(currentBasketProduct.id));
    }
    setCurrentBasketProduct(null);
  };

  return (
    <>
      <ul className="basket__list" data-testid="basket__list">
        {basketList.map((product) => <BasketItem key={product.vendorCode} product={product} onDeleteClick={handleDeleteClick}/>)}
      </ul>
      <ModalDeleteProduct isActive={modalState} onCloseModal={handleCloseModalClick} currentProduct={currentBasketProduct} onDeleteProduct={handleModalDeleteClick}/>
    </>
  );
}
