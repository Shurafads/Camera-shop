import { useAppDispatch, useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { PRODUCTS_PER_PAGE } from '../../const';
import { getCurrentPage } from '../../store/search-data/search-data.selectors';
import classes from './card-list.module.css';
import { useEffect } from 'react';
import { changeCurrentPage } from '../../store/search-data/search-data';

type CardListProps = {
  onBuyClick: () => void;
}

export default function CardList({onBuyClick}: CardListProps) {

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const productsList = useAppSelector(getFiltredProductsList);

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

  return (
    <div className="cards catalog__cards" data-testid="card-list">
      {productsOnPage.length < 1 && <h2 className={`title title-h2 ${classes.title}`}>По вашему запросу ничего не найдено</h2>}
      {productsOnPage.map((product) => <Card key={product.id} product={product} onBuyClick={onBuyClick}/>)}
    </div>
  );
}
