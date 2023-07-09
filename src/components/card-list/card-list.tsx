import { useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { PRODUCTS_PER_PAGE } from '../../const';
import { getCurrentPage } from '../../store/search-data/search-data.selectors';

type CardListProps = {
  onBuyClick: () => void;
}

export default function CardList({onBuyClick}: CardListProps) {

  const currentPage = Number(useAppSelector(getCurrentPage));
  const productsList = useAppSelector(getFiltredProductsList);

  const lastProduct = PRODUCTS_PER_PAGE * currentPage;
  const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

  const productsOnPage = productsList.slice(firstProduct, lastProduct);

  return (
    <div className="cards catalog__cards" data-testid="card-list">
      {productsOnPage.map((product) => <Card key={product.id} product={product} onBuyClick={onBuyClick}/>)}
    </div>
  );
}
