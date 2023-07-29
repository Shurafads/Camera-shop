import { Category, CouponStatus, Level, SortDirection, SortType, Type } from '../const';
import { store } from '../store';
import { TProduct } from './product';
import { TPromo } from './promo';
import { TReview } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TCamerasData = {
  productsList: TProduct[];
  productInfo: TProduct | null;
  similarProductsList: TProduct[];
  isLoadingProductsList: boolean;
  isLoadingProducInfo: boolean;
}

export type TPromoData = {
  promo: TPromo | null;
}

export type TReviewsData = {
  reviewsList: TReview[];
}

export type TSearchData = {
  page: number;
  sortType: SortType | null;
  sortDirection: SortDirection | null;
  minPrice: number;
  maxPrice: number;
  category: Category | null;
  filterType: Type[];
  level: Level[];
}

export type TBasketData = {
  basketList: TProduct[];
  sale: number | null;
  coupon: string | null;
  couponValidStatus: CouponStatus;
  successPopupStatus: boolean;
  isSendingOrder: boolean;
}
