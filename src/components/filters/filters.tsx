import { useAppDispatch } from '../../store';
import { resetFilter } from '../../store/search-data/search-data';
import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';
import { useEffect, useState } from 'react';

export default function Filters() {

  const dispatch = useAppDispatch();
  const [isResetFilter, setIsResetFilter] = useState(false);

  const handleResetClick = () => {
    setIsResetFilter(true);
    dispatch(resetFilter());
  };

  useEffect(() => {
    if (isResetFilter) {
      setIsResetFilter(false);
    }
  },[isResetFilter]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <FilterByPrice isResetFilter={isResetFilter} />
        <FilterByCategory />
        <FilterByType />
        <FilterByLevel />
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetClick}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
