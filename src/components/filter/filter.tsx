import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getSortedProductsList } from '../../store/products-data/products-data.selectors';
import { SortPriceToHigh } from '../../utils/utils';
import { getcurrentMaxPrice, getcurrentMinPrice } from '../../store/search-data/search-data.selectors';
import { changePrice } from '../../store/search-data/search-data';

export default function Filter() {

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
      dispatch(changePrice([0, priceValue.priceUp]));
      return;
    }

    if (+priceValue.price < +minPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: +minPrice,
      }));
      dispatch(changePrice([+minPrice, priceValue.priceUp]));
      return;
    }

    if (+priceValue.price > +maxPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        price: +maxPrice,
      }));
      dispatch(changePrice([+maxPrice, priceValue.priceUp]));
      return;
    }

    dispatch(changePrice([priceValue.price, priceValue.priceUp]));
  };

  const handleMaxPriceBlur = () => {

    if (!priceValue.priceUp) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: 0,
      }));
      dispatch(changePrice([priceValue.price, 0]));
      return;
    }

    if (+priceValue.priceUp < +minPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: +minPrice,
      }));
      dispatch(changePrice([priceValue.price, +minPrice]));
      return;
    }

    if (+priceValue.priceUp > +maxPrice) {
      setPriceValue((prevState) => ({
        ...prevState,
        priceUp: +maxPrice,
      }));
      dispatch(changePrice([priceValue.price, +maxPrice]));
      return;
    }

    dispatch(changePrice([priceValue.price, priceValue.priceUp]));
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
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
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="photocamera"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional"/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
