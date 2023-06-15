import { useAppSelector } from '../../store';
import { getProductsOnPage } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';

export default function CardList() {

  const productsList = useAppSelector(getProductsOnPage);

  return (
    <div className="cards catalog__cards">
      {productsList.map((product) => <Card key={product.id} product={product}/>)}
    </div>
  );
}
