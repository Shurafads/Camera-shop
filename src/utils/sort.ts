import { SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { TReview } from '../types/review';

const sortPriceToLow = (a: TProduct, b: TProduct) => {
  if (a.price > b.price) {
    return -1;
  }
  if (a.price < b.price) {
    return 1;
  }
  return 0;
};

const sortRatingToHigh = (a: TProduct, b: TProduct) => {
  if (a.rating < b.rating) {
    return -1;
  }
  if (a.rating > b.rating) {
    return 1;
  }
  return 0;
};

const sortRatingToLow = (a: TProduct, b: TProduct) => {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
};

export const sortDate = (a: TReview, b: TReview) => {
  if (a.createAt > b.createAt) {
    return -1;
  }
  if (a.createAt < b.createAt) {
    return 1;
  }
  return 0;
};

export const sortPriceToHigh = (a: TProduct, b: TProduct) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
};

export const sortProductsList = (productsList: TProduct[], sortType: SortType | null, direction: SortDirection| null) => {

  let sortedProductsList = [...productsList];

  if (sortType === SortType.Price && direction === SortDirection.Up) {
    sortedProductsList = [...productsList].sort(sortPriceToHigh);
    return sortedProductsList;
  }

  if (sortType === SortType.Price && direction === SortDirection.Down) {
    sortedProductsList = [...productsList].sort(sortPriceToLow);
    return sortedProductsList;
  }

  if (sortType === SortType.Popular && direction === SortDirection.Up) {
    sortedProductsList = [...productsList].sort(sortRatingToHigh);
    return sortedProductsList;
  }

  if (sortType === SortType.Popular && direction === SortDirection.Down) {
    sortedProductsList = [...productsList].sort(sortRatingToLow);
    return sortedProductsList;
  }

  return sortedProductsList;
};
