import { useAppSelector } from '../../store';
import { getSimilarProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { useRef, useState } from 'react';

type SliderProps = {
  onBuyClick: () => void;
}

export default function Slider({onBuyClick}: SliderProps) {

  const similarProductList = useAppSelector(getSimilarProductsList);
  const swiperRef = useRef<SwiperRef['swiper']>();

  const [state, setState] = useState({isBegin: true, isEnd: false});

  if (similarProductList.length < 1) {
    return null;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper
            updateOnWindowResize
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
                <Card className="is-active" product={product} onBuyClick={onBuyClick} style={{width: '90%'}}/>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            style={state.isBegin ? {pointerEvents: 'none', zIndex: '1'} : {pointerEvents: 'auto', zIndex: '1'}}
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
            style={state.isEnd ? {pointerEvents: 'none', zIndex: '1'} : {pointerEvents: 'auto', zIndex: '1'}}
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
      </div>
    </section>
  );
}
