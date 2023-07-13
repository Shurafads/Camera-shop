import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeLevel } from '../../store/search-data/search-data';
import { getCurrentLevel } from '../../store/search-data/search-data.selectors';
import { Level } from '../../const';

export default function FilterByLevel() {

  const refZero = useRef<HTMLInputElement | null>(null);
  const refMiddle = useRef<HTMLInputElement | null>(null);
  const refProfessional = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector(getCurrentLevel);

  const handleLevelChange = () => {

    const checkedProductLevel = [];
    if (refZero.current?.checked) {
      checkedProductLevel.push(Level.Zero);
    }
    if (refMiddle.current?.checked) {
      checkedProductLevel.push(Level.Amateur);
    }
    if (refProfessional.current?.checked) {
      checkedProductLevel.push(Level.Professional);
    }

    dispatch(changeLevel(checkedProductLevel));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Level.Zero}
            ref={refZero}
            onChange={handleLevelChange}
            checked={currentLevel.includes(Level.Zero)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Level.Amateur}
            ref={refMiddle}
            onChange={handleLevelChange}
            checked={currentLevel.includes(Level.Amateur)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name={Level.Professional}
            ref={refProfessional}
            onChange={handleLevelChange}
            checked={currentLevel.includes(Level.Professional)}
          />
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
}
