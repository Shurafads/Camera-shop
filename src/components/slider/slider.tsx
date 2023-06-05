import { useAppSelector } from '../../store';
import { getSimilarProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import { useRef, useState } from 'react';

export default function Slider() {

  const similarProductList = useAppSelector(getSimilarProductsList);
  const swiperRef = useRef<SwiperRef['swiper']>();

  const [state, setState] = useState({isBegin: true, isEnd: false});

  return (
    <div className="product-similar__slider">
      <Swiper
        slidesPerView={3}
        slidesPerGroup={3}
        className="product-similar__slider-list"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setState({isBegin:swiper.isBeginning, isEnd: swiper.isEnd});
        }}
      >
        {similarProductList.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="is-active" product={product} style={{width: '90%'}}/>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        style={state.isBegin ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
        className="slider-controls slider-controls--prev"
        type="button" aria-label="Предыдущий слайд"
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={state.isBegin}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        style={state.isEnd ? {pointerEvents: 'none'} : {pointerEvents: 'auto'}}
        className="slider-controls slider-controls--next"
        type="button" aria-label="Следующий слайд"
        onClick={() => swiperRef.current?.slideNext()}
        disabled={state.isEnd}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
