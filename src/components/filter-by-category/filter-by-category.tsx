import { useRef } from 'react';
import { useAppDispatch } from '../../store';
import { changeCategory } from '../../store/search-data/search-data';
import { Category } from '../../const';

export default function FilterByCategory() {

  const dispatch = useAppDispatch();

  const refPhoto = useRef<HTMLInputElement>(null);
  const refVideo = useRef<HTMLInputElement>(null);

  const handleCategoryClick = () => {

    if (refPhoto.current?.checked) {
      return dispatch(changeCategory(refPhoto.current?.name as Category));
    }
    if (refVideo.current?.checked) {
      return dispatch(changeCategory(refVideo.current?.name as Category));
    }
    dispatch(changeCategory(null));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="photocamera"
            onChange={handleCategoryClick}
            ref={refPhoto}
            disabled={refVideo.current?.checked}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="videocamera"
            onChange={handleCategoryClick}
            ref={refVideo}
            disabled={refPhoto.current?.checked}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}
