import { store } from '../store';
import { TProduct } from './product';
import { TPromo } from './promo';
import { TReview } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TCamerasData = {
  ProductsList: TProduct[];
  ProductsOnPage: TProduct[];
  ProductInfo: TProduct | null;
  SimilarProductsList: TProduct[];
  isLoadingProductsList: boolean;
  isLoadingProducInfo: boolean;
}

export type TPromoData = {
  Promo: TPromo | null;
}

export type TReviewsData = {
  ReviewsList: TReview[];
}

