import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSortedProductsList } from '../../store/products-data/products-data.selectors';
import { SortPriceToHigh } from '../../utils/utils';
import { getcurrentMaxPrice, getcurrentMinPrice } from '../../store/search-data/search-data.selectors';
import { changeMaxPrice, changeMinPrice } from '../../store/search-data/search-data';

export default function FilterByPrice() {

  const dispatch = useAppDispatch();
  const currentMinPrice = useAppSelector(getcurrentMinPrice);
  const currentMaxPrice = useAppSelector(getcurrentMaxPrice);
  const productsList = useAppSelector(getSortedProductsList).sort(SortPriceToHigh);

  const minPrice = productsList[0].price.toString();
  const maxPrice = productsList[productsList.length - 1].price.toString();

  const [priceValue, setPriceValue] = useState({price: currentMinPrice || 0, priceUp: currentMaxPrice || 0});

  const handleChangePrice = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;
    setPriceValue((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

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

    if (priceValue.priceUp > 0 && priceValue.price > priceValue.priceUp) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: priceValue.priceUp,
      }));
      dispatch(changeMinPrice(priceValue.priceUp));
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

    if (priceValue.price > 0 && priceValue.priceUp < priceValue.price) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: priceValue.price,
      }));
      dispatch(changeMaxPrice(priceValue.price));
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
            <input type="number" name="price" placeholder={minPrice} value={priceValue.price || ''} onChange={handleChangePrice} onBlur={handleMinPriceBlur}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" placeholder={maxPrice} value={priceValue.priceUp || ''} onChange={handleChangePrice} onBlur={handleMaxPriceBlur}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}
