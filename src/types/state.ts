import { Category, SortDirection, SortType } from '../const';
import { store } from '../store';
import { TProduct } from './product';
import { TPromo } from './promo';
import { TReview } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TCamerasData = {
  ProductsList: TProduct[];
  ProductInfo: TProduct | null;
  SimilarProductsList: TProduct[];
  isLoadingProductsList: boolean;
  isLoadingProducInfo: boolean;
  isLoadingSimilarProducts: boolean;
}

export type TPromoData = {
  Promo: TPromo | null;
}

export type TReviewsData = {
  ReviewsList: TReview[];
}

export type TSearchData = {
  Page: number;
  SortType: SortType | null;
  SortDirection: SortDirection | null;
  MinPrice: number;
  MaxPrice: number;
  Category: Category | null;
  ProductType: string[];
}
