import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeType } from '../../store/search-data/search-data';
import { getCurrentCategory, getCurrentProductType } from '../../store/search-data/search-data.selectors';
import { Category } from '../../const';

export default function FilterByType() {

  const refDigital = useRef<HTMLInputElement | null>(null);
  const refFilm = useRef<HTMLInputElement | null>(null);
  const refSnapshot = useRef<HTMLInputElement | null>(null);
  const refCollection = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentType = useAppSelector(getCurrentProductType);

  const handleTypeChange = () => {

    const checkedCameraType = {
      digital: refDigital.current?.checked,
      film: refFilm.current?.checked,
      snapshot: refSnapshot.current?.checked,
      collection: refCollection.current?.checked,
    };

    dispatch(changeType(checkedCameraType));
  };

  useEffect(() => {

    const checkedCameraType = {
      digital: refDigital.current?.checked,
      film: refFilm.current?.checked,
      snapshot: refSnapshot.current?.checked,
      collection: refCollection.current?.checked,
    };

    if (currentCategory === Category.Videocamera) {
      checkedCameraType.film = false;
      checkedCameraType.snapshot = false;
      dispatch(changeType(checkedCameraType));
    }
  }, [currentCategory, dispatch]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="digital"
            ref={refDigital}
            onChange={handleTypeChange}
            checked={currentType.includes('digital')}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="film"
            ref={refFilm}
            onChange={handleTypeChange}
            disabled={currentCategory === Category.Videocamera}
            checked={currentCategory !== 'videocamera' && currentType.includes('film')}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="snapshot"
            ref={refSnapshot}
            onChange={handleTypeChange}
            disabled={currentCategory === Category.Videocamera}
            checked={currentCategory !== 'videocamera' && currentType.includes('snapshot')}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="collection"
            ref={refCollection}
            onChange={handleTypeChange}
            checked={currentType.includes('collection')}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
}
