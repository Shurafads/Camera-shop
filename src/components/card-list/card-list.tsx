import { useAppSelector } from '../../store';
import { getProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';

export default function CardList() {

  const productsList = useAppSelector(getProductsList);
  const slicedProductsList = productsList.slice(-9);

  return (
    <div className="cards catalog__cards">
      {slicedProductsList.map((product) => <Card key={product.id} product={product}/>)}
    </div>
  );
}
