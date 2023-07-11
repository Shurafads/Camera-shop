import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentPage, getCurrentSortDirection, getCurrentSortType, getCurrentCategory, getCurrentMaxPrice, getCurrentMinPrice } from '../../store/search-data/search-data.selectors';
import { changeCategory, changeCurrentPage, changeMaxPrice, changeMinPrice, changeSortDirection, changeSortType } from '../../store/search-data/search-data';
import { Category, SortDirection, SortType, Sorting } from '../../const';
import CatalogContainer from '../../components/catalog-container/catalog-container';
import LoadingPage from '../loading-page/loading-page';
import { getIsLoadingProductsList } from '../../store/products-data/products-data.selectors';
import { TQueryParam } from '../../types/param';

export default function CatalogPage() {

  const dispatch = useAppDispatch();
  const isLoadingProductsList = useAppSelector(getIsLoadingProductsList);
  const currentPage = useAppSelector(getCurrentPage);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortDirection = useAppSelector(getCurrentSortDirection);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);
  const currentCategory = useAppSelector(getCurrentCategory);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const sortType = searchParams.get(Sorting.Type);
  const sortDirection = searchParams.get(Sorting.Direction);
  const minPrice = searchParams.get('price_min');
  const maxPrice = searchParams.get('price_max');
  const category = searchParams.get('category');

  const currentParams = useMemo(() => {
    const queryParam: TQueryParam = {};

    queryParam.page = currentPage.toString();

    if (currentSortType && currentSortDirection) {
      queryParam[Sorting.Type] = currentSortType;
      queryParam[Sorting.Direction] = currentSortDirection;
    }
    if (currentMinPrice) {
      queryParam['price_min'] = currentMinPrice.toString();
    }
    if (currentMaxPrice) {
      queryParam['price_max'] = currentMaxPrice.toString();
    }
    if (currentCategory) {
      queryParam['category'] = currentCategory.toString();
    }

    return queryParam;

  }, [currentPage, currentSortType, currentSortDirection, currentMinPrice, currentMaxPrice, currentCategory]);

  useEffect(() => {

    if (page && +page < 1) {
      dispatch(changeCurrentPage(currentPage));
    }
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

  useEffect(() => {

    if (category) {dispatch(changeCategory(category as Category));}

  }, [category, dispatch]);

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
