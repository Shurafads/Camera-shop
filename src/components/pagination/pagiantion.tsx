// import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProductsList } from '../../store/products-data/products-data.selectors';
import { Link, useSearchParams } from 'react-router-dom';
import { changeProductsAction } from '../../store/products-data/products-data';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../const';
import { useEffect } from 'react';
import { WindowScrollToTop } from '../../utils/utils';

export default function Pagination() {

  const [searchParams, setSearchParams] = useSearchParams({'page': '1'});

  const dispatch = useAppDispatch();
  const productList = useAppSelector(getProductsList);

  const paginationCount = Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  const currentPage = Number(searchParams.get('page')) || 1;

  const lastProduct = PRODUCTS_PER_PAGE * currentPage;
  const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(changeProductsAction([firstProduct, lastProduct]));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, firstProduct, lastProduct]);

  useEffect(() => {
    let isMounted = true;

    if (currentPage > paginationCount && isMounted) {
      setSearchParams({'page': '1'});
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, setSearchParams, paginationCount]);

  return (
    <div className="pagination" data-testid={'pagination'}>
      <ul className="pagination__list">

        <li className={Number(currentPage) > 1 ? 'pagination__item' : 'visually-hidden'}>
          <Link
            className="pagination__link pagination__link--text"
            to={`${AppRoute.Catalog}?page=${currentPage - 1}`}
            onClick={() => WindowScrollToTop()}
          >
            Назад
          </Link>
        </li>

        {
          Array
            .from({length: paginationCount})
            .map((_, index) => (
              <li
                key={String(index + 1)}
                className="pagination__item"
                style={{marginRight: index + 1 === currentPage && index + 1 === paginationCount ? '99px' : ''}}
              >
                <Link className={currentPage === index + 1 ? 'pagination__link pagination__link--active' : 'pagination__link'}
                  to={`${AppRoute.Catalog}?page=${index + 1}`}
                  onClick={() => WindowScrollToTop()}
                >
                  {index + 1}
                </Link>
              </li>
            ))
        }

        <li className={Number(currentPage) < paginationCount ? 'pagination__item' : 'visually-hidden'}>
          <Link
            className="pagination__link pagination__link--text"
            to={`${AppRoute.Catalog}?page=${currentPage + 1}`}
            onClick={() => WindowScrollToTop()}
          >
            Далее
          </Link>
        </li>

      </ul>
    </div>
  );
}
