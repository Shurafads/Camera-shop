import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeCategory } from '../../store/search-data/search-data';
import { Category } from '../../const';
import { getCurrentCategory } from '../../store/search-data/search-data.selectors';

export default function FilterByCategory() {

  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(getCurrentCategory);

  const refPhoto = useRef<HTMLInputElement>(null);
  const refVideo = useRef<HTMLInputElement>(null);

  const handleCategoryChange = () => {

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
            name={Category.Photocamera}
            onChange={handleCategoryChange}
            ref={refPhoto}
            disabled={refVideo.current?.checked}
            checked={currentCategory === Category.Photocamera}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Category.Videocamera}
            onChange={handleCategoryChange}
            ref={refVideo}
            disabled={refPhoto.current?.checked}
            checked={currentCategory === Category.Videocamera}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
}
