import { useAppSelector } from '../../store';
import { getPromo } from '../../store/promo-data/promo-data.selectors';

export default function Banner() {

  const promo = useAppSelector(getPromo);

  if (!promo) {
    return null;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x}`}/>
        <img src={promo.previewImg} srcSet={promo.previewImg2x} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <a className="btn" href="#">Подробнее</a>
      </p>
    </div>
  );
}
