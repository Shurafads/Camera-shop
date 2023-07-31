import CardList from '../card-list/card-list';
import Filters from '../filters/filters';
import Pagination from '../pagination/pagiantion';
import Sort from '../sort/sort';
import { useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';

export default function CatalogContainer() {

  const productList = useAppSelector(getFiltredProductsList);

  return (
    <section className="catalog">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <Filters />
          </div>
          <div className="catalog__content">
            <Sort />
            <CardList />
            {productList.length > 1 && <Pagination />}
          </div>
        </div>
      </div>
    </section>
  );
}
