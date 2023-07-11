import { MouseEvent, useEffect, useState } from 'react';
import CardList from '../card-list/card-list';
import Filters from '../filters/filters';
import Pagination from '../pagination/pagiantion';
import Sort from '../sort/sort';
import { useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import ReactFocusLock from 'react-focus-lock';
import ModalAddProduct from '../modal-add-product/modal-add-product';

export default function CatalogContainer() {

  const [modalAddState, setModalAddState] = useState(false);
  const productList = useAppSelector(getFiltredProductsList);

  useEffect(() => {
    let isMounted = true;

    if (!modalAddState && isMounted) {
      return;
    }
    if (isMounted) {
      document.addEventListener('keydown', handleEscapeKeydown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';
    }

    return () => {
      setTimeout(() => {
        document.body.style.overflow = '';
        document.documentElement.style.paddingRight = '';
      }, 500);
      document.removeEventListener('keydown', handleEscapeKeydown);
      isMounted = false;
    };

  });

  const handleEscapeKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseModalClick(evt);
    }
  };

  const handleBuyClick = () => {
    setModalAddState(true);
  };

  const handleCloseModalClick = (evt: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement> | KeyboardEvent) => {
    evt.preventDefault();
    setModalAddState(false);
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
        <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseModalClick}/>
      </ReactFocusLock>
    </>
  );
}
