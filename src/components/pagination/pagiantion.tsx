import { useAppDispatch, useAppSelector } from '../../store';
import { getFiltredProductsList } from '../../store/products-data/products-data.selectors';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../const';
import { MouseEvent, useEffect } from 'react';
import { WindowScrollToTop } from '../../utils/utils';
import { getCurrentPage } from '../../store/search-data/search-data.selectors';
import { changeCurrentPage } from '../../store/search-data/search-data';

export default function Pagination() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productList = useAppSelector(getFiltredProductsList);
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationCount = Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    let isMounted = true;

    if (currentPage > paginationCount && isMounted) {
      dispatch(changeCurrentPage(1));
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, setSearchParams, paginationCount, dispatch]);

  const handlePaginationClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const target = evt.target as Element;

    if (target.textContent) {
      dispatch(changeCurrentPage(Number(target.textContent)));
      navigate({
        pathname: AppRoute.Catalog,
        search: searchParams.toString()
      });
      WindowScrollToTop();
    }
  };

  const handlePrevClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const target = evt.target as Element;

    if (target.textContent) {
      dispatch(changeCurrentPage(currentPage - 1));
      navigate({
        pathname: AppRoute.Catalog,
        search: searchParams.toString()
      });
      WindowScrollToTop();
    }
  };

  const handleNextClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    const target = evt.target as Element;

    if (target.textContent) {
      dispatch(changeCurrentPage(currentPage + 1));
      navigate({
        pathname: AppRoute.Catalog,
        search: searchParams.toString()
      });
      WindowScrollToTop();
    }
  };

  return (
    <div className="pagination" data-testid={'pagination'}>
      <ul className="pagination__list">

        <li className={currentPage > 1 ? 'pagination__item' : 'visually-hidden'}>
          <Link
            className="pagination__link pagination__link--text"
            to={'/'}
            onClick={handlePrevClick}
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
                  to={'/'}
                  onClick={handlePaginationClick}
                >
                  {index + 1}
                </Link>
              </li>
            ))
        }

        <li className={currentPage < paginationCount ? 'pagination__item' : 'visually-hidden'}>
          <Link
            className="pagination__link pagination__link--text"
            to={'/'}
            onClick={handleNextClick}
          >
            Далее
          </Link>
        </li>

      </ul>
    </div>
  );
}
