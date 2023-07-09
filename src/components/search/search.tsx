import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { getProductsList } from '../../store/products-data/products-data.selectors';
import { AppRoute, ProductTab } from '../../const';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {

  const location = useLocation();
  const navigate = useNavigate();
  const productsList = useAppSelector(getProductsList);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInputValue('');
  },[location]);

  const filteredProductList = inputValue && productsList.filter((product) => product.name.toLowerCase().includes(inputValue.toLowerCase()));

  const handleItemClick = (productId: number) => {
    navigate(`${AppRoute.Product}/${productId}?tab=${ProductTab.Description}`);
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleButtonClick = () => {
    setInputValue('');
  };

  return (
    <div className={`form-search ${isOpen && filteredProductList.length > 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={inputValue}
            onChange={(evt) => setInputValue(evt.target.value)}
            onClick={handleInputClick}
          />
        </label>
        <ul className="form-search__select-list">
          {isOpen && filteredProductList && filteredProductList
            .map((product) =>
              <li key={product.id} className="form-search__select-item" tabIndex={0} onClick={() =>handleItemClick(product.id)}>{product.name}</li>)}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleButtonClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
