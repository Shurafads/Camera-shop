import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store';
import { getProductsList } from '../../store/products-data/products-data.selectors';
import { useLocation } from 'react-router-dom';
import SearchItem from '../search-item/search-item';
import { TProduct } from '../../types/product';

export default function Search() {

  const location = useLocation();
  const productsList = useAppSelector(getProductsList);

  const searchContainer = useRef<HTMLDivElement>(null);
  const searchElement = useRef<HTMLInputElement>(null);
  const resetButtonElement = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [serchedList, setSerchedList] = useState([] as TProduct[]);
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);

  useEffect(() => {
    setIsOpen(false);
  },[location]);

  const handleButtonClick = () => {
    setInputValue('');
    setCurrentItemIndex(-1);
    setSerchedList([]);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setCurrentItemIndex(-1);
    setIsOpen(serchedList.length > 0);
  };

  const handleSearchContainerBlur = (evt: FocusEvent<HTMLDivElement>) => {
    const relatedElement = evt.relatedTarget;

    if (!searchContainer.current?.contains(relatedElement)) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const targetValue = evt.target.value;
    const searchedProductList = targetValue === '' ? [] : productsList.filter((product) => product.name.toLowerCase().includes(targetValue.toLowerCase()));
    setSerchedList(searchedProductList);
    setIsOpen(searchedProductList.length > 0);
    setInputValue(targetValue);
  };

  const handleInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'ArrowDown') {
      evt.preventDefault();
      setCurrentItemIndex(currentItemIndex + 1);
    }
    if (evt.key === 'Tab' && isOpen) {
      evt.preventDefault();
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handleListKeyDown = (evt: React.KeyboardEvent<HTMLUListElement>) => {
    evt.preventDefault();

    if (evt.key === 'ArrowUp') {
      if (currentItemIndex > 0) {
        setCurrentItemIndex(currentItemIndex - 1);
      }
      if (currentItemIndex < 1) {
        setCurrentItemIndex(serchedList.length - 1);
      }
    }

    if (evt.key === 'ArrowDown') {
      setCurrentItemIndex((prevIndex) => prevIndex < serchedList.length - 1 ? prevIndex + 1 : 0);
    }

    if (evt.key === 'Tab') {
      if (currentItemIndex < serchedList.length - 1) {
        setCurrentItemIndex(currentItemIndex + 1);
      }
      resetButtonElement.current?.focus();
    }
  };

  return (
    <div
      className={`form-search ${isOpen ? 'list-opened' : ''}`}
      ref={searchContainer}
      onBlur={handleSearchContainerBlur}
    >
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
            ref={searchElement}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
          />
        </label>
        <ul
          className="form-search__select-list scroller"
          onKeyDown={handleListKeyDown}
        >
          {isOpen && serchedList
            .map((product, index) =>
              <SearchItem key={product.id} product={product} setIsOpen={setIsOpen} isActive={currentItemIndex === index}/>
            )}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleButtonClick}
        ref={resetButtonElement}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
