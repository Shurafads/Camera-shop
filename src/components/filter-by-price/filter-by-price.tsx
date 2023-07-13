import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSortedProductsList } from '../../store/products-data/products-data.selectors';
import { getCurrentMaxPrice, getCurrentMinPrice } from '../../store/search-data/search-data.selectors';
import { changeMaxPrice, changeMinPrice } from '../../store/search-data/search-data';
import { getPrice } from '../../utils/filter';

type FilterByPriceProps = {
  isResetFilter: boolean;
}

export default function FilterByPrice({isResetFilter}: FilterByPriceProps) {

  const dispatch = useAppDispatch();
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);
  const productsList = useAppSelector(getSortedProductsList);

  const minPrice = getPrice(productsList, 'min');
  const maxPrice = getPrice(productsList, 'max');

  const [priceValue, setPriceValue] = useState({price: currentMinPrice || 0, priceUp: currentMaxPrice || 0});

  const handleChangePrice = (evt: ChangeEvent<HTMLInputElement>) => {

    const {value, name} = evt.target;
    setPriceValue((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  useEffect(() => {

    if (isResetFilter) {
      setPriceValue({price: 0, priceUp: 0});
    }

  }, [isResetFilter]);

  const handleMinPriceBlur = () => {

    if (!priceValue.price) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: 0,
      }));
      dispatch(changeMinPrice(0));
      return;
    }

    if (priceValue.price < +minPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: +minPrice,
      }));
      dispatch(changeMinPrice(+minPrice));
      return;
    }

    if (+priceValue.price > +maxPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: +maxPrice,
      }));
      dispatch(changeMinPrice(+maxPrice));
      return;
    }

    dispatch(changeMinPrice(priceValue.price));
  };

  const handleMaxPriceBlur = () => {

    if (!priceValue.priceUp) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: 0,
      }));
      dispatch(changeMaxPrice(0));
      return;
    }

    if (priceValue.priceUp > +maxPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: +maxPrice,
      }));
      dispatch(changeMaxPrice(+maxPrice));
      return;
    }

    if (priceValue.priceUp < +minPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: +minPrice,
      }));
      dispatch(changeMaxPrice(+minPrice));
      return;
    }

    dispatch(changeMaxPrice(priceValue.priceUp));
  };
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number" name="price"
              placeholder={minPrice}
              value={priceValue.price || ''}
              onChange={handleChangePrice}
              onBlur={handleMinPriceBlur}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={maxPrice}
              value={priceValue.priceUp || ''}
              onChange={handleChangePrice}
              onBlur={handleMaxPriceBlur}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}
