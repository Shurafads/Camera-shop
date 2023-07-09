import { TProduct } from '../types/product';
import { TReview } from '../types/review';

export const SortDate = (a: TReview, b: TReview) => {
  if (a.createAt > b.createAt) {
    return -1;
  }
  if (a.createAt < b.createAt) {
    return 1;
  }
  return 0;
};

export const SortPriceToHigh = (a: TProduct, b: TProduct) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
};

export const SortPriceToLow = (a: TProduct, b: TProduct) => {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
};

export const SortRatingToHigh = (a: TProduct, b: TProduct) => {
  if (a.rating < b.rating) {
    return -1;
  }
  if (a.rating > b.rating) {
    return 1;
  }
  return 0;
};

export const SortRatingToLow = (a: TProduct, b: TProduct) => {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
};

export const WindowScrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
