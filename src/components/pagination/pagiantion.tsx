import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProductsList } from '../../store/products-data/products-data.selectors';
import { Link, useSearchParams } from 'react-router-dom';
import { changeProductsAction } from '../../store/products-data/products-data';
import { PRODUCTS_PER_PAGE } from '../../const';

export default function Pagination() {

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const productList = useAppSelector(getProductsList);
  const currentPage = searchParams.get('page');

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setSearchParams({page: '1'});
    }

    return () => {
      isMounted = false;
    };
  }, [productList]);

  const paginationCount = Math.ceil(productList.length / 9);

  const handlePaginationClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentElement = evt.currentTarget;
    setSearchParams({page: currentElement.innerHTML});

    const lastProduct = PRODUCTS_PER_PAGE * Number(currentElement.innerHTML);
    const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

    dispatch(changeProductsAction([firstProduct, lastProduct]));
  };

  const handlePrevClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (currentPage && Number(currentPage) > 1) {
      const prevPage = Number(currentPage) - 1;
      setSearchParams({page: String(prevPage)});

      const lastProduct = PRODUCTS_PER_PAGE * prevPage;
      const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

      dispatch(changeProductsAction([firstProduct, lastProduct]));
    }
  };

  const handleNextClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (currentPage && Number(currentPage) < paginationCount) {
      const prevPage = Number(currentPage) + 1;
      setSearchParams({page: String(prevPage)});

      const lastProduct = PRODUCTS_PER_PAGE * prevPage;
      const firstProduct = lastProduct - PRODUCTS_PER_PAGE;

      dispatch(changeProductsAction([firstProduct, lastProduct]));
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">

        <li className={Number(currentPage) > 1 ? 'pagination__item' : 'visually-hidden'}>
          <Link className="pagination__link pagination__link--text" to="#" onClick={handlePrevClick} >Назад</Link>
        </li>

        {
          Array
            .from({length: paginationCount})
            .map((_, index) => (
              <li
                key={String(index + 1)}
                className="pagination__item"
                style={{marginRight: index + 1 === Number(currentPage) && index + 1 === paginationCount ? '99px' : ''}}
              >
                <Link className={currentPage === String(index + 1) ? 'pagination__link pagination__link--active' : 'pagination__link'} to="#" onClick={handlePaginationClick}>
                  {index + 1}
                </Link>
              </li>
            ))
        }

        <li className={Number(currentPage) < paginationCount ? 'pagination__item' : 'visually-hidden'}>
          <Link className="pagination__link pagination__link--text" to="#" onClick={handleNextClick}>Далее</Link>
        </li>

      </ul>
    </div>
  );
}
