import { SortDirection, SortType, Sorting } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeSortDirection, changeSortType } from '../../store/search-data/search-data';
import { getCurrentSortDirection, getCurrentSortType } from '../../store/search-data/search-data.selectors';

export default function Sort() {

  const dispatch = useAppDispatch();
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortDirection = useAppSelector(getCurrentSortDirection);

  const handleButtonSortTypeClick = (type: SortType) => {
    dispatch(changeSortType(type));
  };

  const handleButtonSortDirectionClick = (direction: SortDirection) => {
    dispatch(changeSortDirection(direction));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id={SortType.Price}
                name={Sorting.Type}
                onChange={() => handleButtonSortTypeClick(SortType.Price)}
                checked={currentSortType === SortType.Price}
              />
              <label htmlFor={SortType.Price}>по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id={SortType.Popular}
                name={Sorting.Type}
                onChange={() => handleButtonSortTypeClick(SortType.Popular)}
                checked={currentSortType === SortType.Popular}
              />
              <label htmlFor={SortType.Popular}>по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id={SortDirection.Up}
                name={Sorting.Direction}
                aria-label="По возрастанию"
                onChange={() => handleButtonSortDirectionClick(SortDirection.Up)}
                checked={currentSortDirection === SortDirection.Up}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id={SortDirection.Down}
                name={Sorting.Direction}
                aria-label="По убыванию"
                onChange={() => handleButtonSortDirectionClick(SortDirection.Down)}
                checked={currentSortDirection === SortDirection.Down}
              />
              <label htmlFor={SortDirection.Down}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
