import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeType } from '../../store/search-data/search-data';
import { getCurrentCategory, getCurrentFilterType } from '../../store/search-data/search-data.selectors';
import { Category, Type } from '../../const';

export default function FilterByType() {

  const refDigital = useRef<HTMLInputElement | null>(null);
  const refFilm = useRef<HTMLInputElement | null>(null);
  const refSnapshot = useRef<HTMLInputElement | null>(null);
  const refCollection = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentType = useAppSelector(getCurrentFilterType);

  const handleTypeChange = () => {

    const checkedProductType = [];

    if (refDigital.current?.checked) {
      checkedProductType.push(Type.Digital);
    }
    if (refFilm.current?.checked) {
      checkedProductType.push(Type.Film);
    }
    if (refSnapshot.current?.checked) {
      checkedProductType.push(Type.Snapshot);
    }
    if (refCollection.current?.checked) {
      checkedProductType.push(Type.Collection);
    }

    dispatch(changeType(checkedProductType));
  };

  useEffect(() => {

    const checkedProductType = [];

    if (refDigital.current?.checked) {
      checkedProductType.push(Type.Digital);
    }
    if (refCollection.current?.checked) {
      checkedProductType.push(Type.Collection);
    }

    if (currentCategory === Category.Videocamera) {
      dispatch(changeType(checkedProductType));
    }
  }, [currentCategory, dispatch]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Type.Digital}
            ref={refDigital}
            onChange={handleTypeChange}
            checked={currentType.includes(Type.Digital)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Type.Film}
            ref={refFilm}
            onChange={handleTypeChange}
            disabled={currentCategory === Category.Videocamera}
            checked={currentCategory !== Category.Videocamera && currentType.includes(Type.Film)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Type.Snapshot}
            ref={refSnapshot}
            onChange={handleTypeChange}
            disabled={currentCategory === Category.Videocamera}
            checked={currentCategory !== Category.Videocamera && currentType.includes(Type.Snapshot)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Type.Collection}
            ref={refCollection}
            onChange={handleTypeChange}
            checked={currentType.includes(Type.Collection)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}
