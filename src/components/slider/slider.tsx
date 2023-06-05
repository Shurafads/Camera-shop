import { useState } from 'react';
// import { useAppSelector } from '../../store';
// import { getSimilarProductsList } from '../../store/products-data/products-data.selectors';
// import Card from '../card/card';

export default function Slider() {

  // const similarProductList = useAppSelector(getSimilarProductsList);
  // const similarListLength = similarProductList.length;
  const [index, setIndex] = useState(0);

  return (
    <div className="product-similar__slider">
      {/* <div className="product-similar__slider-list">
        {similarProductList.map((product) => <Card className="is-active" key={product.id} product={product}/>)}
      </div> */}
      <h3 style={{fontSize: '100px'}} onClick={() => setIndex((prevState) => prevState + 1 )}>{index}</h3>
      <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={() => setIndex((prevState) => prevState + 1 )}>
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={() => setIndex((prevState) => prevState + 1 )}>
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
