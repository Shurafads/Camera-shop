import { useAppDispatch, useAppSelector } from '../../store';
import { getSimilarProductsList } from '../../store/products-data/products-data.selectors';
import Card from '../card/card';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import ModalAddProductSuccess from '../modal-add-product-success/modal-add-product-success';
import { TProduct } from '../../types/product';
import { addProductToBasket } from '../../store/basket-data/basket-data';

export default function Slider() {

  const dispatch = useAppDispatch();
  const similarProductList = useAppSelector(getSimilarProductsList);
  const swiperRef = useRef<SwiperRef['swiper']>();

  const [modalAddState, setModalAddState] = useState(false);
  const [modalAddSuccessState, setModalAddSuccessState] = useState(false);
  const [currentBasketProduct, setCurrentBasketProduct] = useState<TProduct | null>(null);
  const [sliderState, setSliderState] = useState({isBegin: true, isEnd: false});

  useEffect(() => {
    let isMounted = true;
    if (!modalAddState && !modalAddSuccessState && isMounted) {
      return;
    }

    if (isMounted) {
      document.addEventListener('keydown', handleEscapeKeydown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
      isMounted = false;
    };
  });

  if (similarProductList.length < 1) {
    return null;
  }

  const handleEscapeKeydown = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleCloseAddModalClick();
      handleCloseSuccessModalClick();
    }
  };

  const handleBuyClick = (product: TProduct) => {
    setModalAddState(true);
    setCurrentBasketProduct(product);
  };

  const handleCloseAddModalClick = (evt?: MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    evt?.preventDefault();
    setModalAddState(false);
  };

  const handleSuccessModalSubmit = () => {
    setModalAddState(false);
    if (currentBasketProduct) {
      dispatch(addProductToBasket(currentBasketProduct));
    }

    setModalAddSuccessState(true);
    setCurrentBasketProduct(null);
  };

  const handleCloseSuccessModalClick = () => {
    setModalAddSuccessState(false);
  };

  return (
    <>
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
                setSliderState({isBegin:swiper.isBeginning, isEnd: swiper.isEnd});
              }}
            >
              {similarProductList.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card className="is-active" product={product} onBuyClick={handleBuyClick} style={{width: '90%'}}/>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              style={sliderState.isBegin ? {pointerEvents: 'none', zIndex: '1'} : {pointerEvents: 'auto', zIndex: '1'}}
              className="slider-controls slider-controls--prev"
              type="button" aria-label="Предыдущий слайд"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={sliderState.isBegin}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              style={sliderState.isEnd ? {pointerEvents: 'none', zIndex: '1'} : {pointerEvents: 'auto', zIndex: '1'}}
              className="slider-controls slider-controls--next"
              type="button" aria-label="Следующий слайд"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={sliderState.isEnd}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>

      <ModalAddProduct isActive={modalAddState} onCloseClick={handleCloseAddModalClick} currentBasketProduct={currentBasketProduct} onSubmitClick={handleSuccessModalSubmit}/>
      <ModalAddProductSuccess isActive={modalAddSuccessState} onCloseClick={handleCloseSuccessModalClick}/>
    </>
  );
}
