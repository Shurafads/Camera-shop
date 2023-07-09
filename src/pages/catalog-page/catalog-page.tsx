import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentPage, getCurrentSortDirection, getCurrentSortType } from '../../store/search-data/search-data.selectors';
import { changeSortDirection, changeSortType } from '../../store/search-data/search-data';
import { SortDirection, SortType, Sorting } from '../../const';
import CatalogContainer from '../../components/catalog-container/catalog-container';
import LoadingPage from '../loading-page/loading-page';
import { getIsLoadingProductsList } from '../../store/products-data/products-data.selectors';

export default function CatalogPage() {

  const dispatch = useAppDispatch();
  const isLoadingProductsList = useAppSelector(getIsLoadingProductsList);
  const currentPage = useAppSelector(getCurrentPage);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortDirection = useAppSelector(getCurrentSortDirection);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get(Sorting.Type);
  const sortDirection = searchParams.get(Sorting.Direction);

  useEffect(() => {

    searchParams.set('page', currentPage.toString());

    if (currentSortType && currentSortDirection) {
      searchParams.set(Sorting.Type, currentSortType);
      searchParams.set(Sorting.Direction, currentSortDirection);
    }

    setSearchParams(searchParams);
  },[currentPage, currentSortType, currentSortDirection, searchParams, sortType, sortDirection, setSearchParams]);

  useEffect(() => {
    if (sortType) {
      dispatch(changeSortType(sortType as SortType));
    }
    if (sortDirection) {
      dispatch(changeSortDirection(sortDirection as SortDirection));
    }

  }, [sortType, sortDirection, dispatch]);

  if (isLoadingProductsList) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Каталог - фотошоп</title>
      </Helmet>
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={'/'}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <CatalogContainer />
        </div>
      </main>
    </>
  );
}
