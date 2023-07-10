import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentPage, getCurrentSortDirection, getCurrentSortType, getcurrentMaxPrice, getcurrentMinPrice } from '../../store/search-data/search-data.selectors';
import { changeCurrentPage, changeMaxPrice, changeMinPrice, changeSortDirection, changeSortType } from '../../store/search-data/search-data';
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
  const currentMinPrice = useAppSelector(getcurrentMinPrice);
  const currentMaxPrice = useAppSelector(getcurrentMaxPrice);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const sortType = searchParams.get(Sorting.Type);
  const sortDirection = searchParams.get(Sorting.Direction);
  const minPrice = searchParams.get('price_min');
  const maxPrice = searchParams.get('price_max');

  type QueryParam = {
    page?: string;
    [Sorting.Type]?: string;
    [Sorting.Direction]?: string;
    price_min?: string;
    price_max?: string;
  };

  const currentParams = useMemo(() => {
    const queryParams: QueryParam = {};

    queryParams.page = currentPage.toString();

    if (currentSortType && currentSortDirection) {
      queryParams[Sorting.Type] = currentSortType;
      queryParams[Sorting.Direction] = currentSortDirection;
    }
    if (currentMinPrice) {
      queryParams['price_min'] = currentMinPrice.toString();
    }
    if (currentMaxPrice) {
      queryParams['price_max'] = currentMaxPrice.toString();
    }

    return queryParams;

  }, [currentPage, currentSortType, currentSortDirection, currentMinPrice, currentMaxPrice]);

  useEffect(() => {

    if (page && +page > 0) {
      dispatch(changeCurrentPage(+page));
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, dispatch]);

  useEffect(() => {

    setSearchParams(currentParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentParams, dispatch]);

  useEffect(() => {

    if (sortType) {dispatch(changeSortType(sortType as SortType));}
    if (sortDirection) {dispatch(changeSortDirection(sortDirection as SortDirection));}

  }, [sortType, sortDirection, dispatch]);

  useEffect(() => {

    if (minPrice) {dispatch(changeMinPrice(+minPrice));}
    if (maxPrice) {dispatch(changeMaxPrice(+maxPrice));}

  }, [minPrice, maxPrice, dispatch]);

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
