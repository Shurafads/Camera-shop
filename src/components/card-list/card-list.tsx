import { useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { PRODUCTS_PER_PAGE } from '../../const';
import { getCurrentPage } from '../../store/search-data/search-data.selectors';
import classes from './card-list.module.css';

type CardListProps = {
  onBuyClick: () => void;
}

export default function CardList({onBuyClick}: CardListProps) {

  const currentPage = useAppSelector(getCurrentPage);
  const productsList = useAppSelector(getFiltredProductsList);

  const lastProduct = PRODUCTS_PER_PAGE * currentPage;
  const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

  const productsOnPage = productsList.slice(firstProduct, lastProduct);

  return (
    <div className="cards catalog__cards" data-testid="card-list">
      {productsOnPage.length < 1 && <h2 className={`title title-h2 ${classes.title}`}>Нет товаров по вашему запросу</h2>}
      {productsOnPage.map((product) => <Card key={product.id} product={product} onBuyClick={onBuyClick}/>)}
    </div>
  );
}
