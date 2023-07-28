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

export const getProductsCount = (productList: TProduct[]) => {
  let totalCount = 0;

  productList.forEach((item) => {
    if (item.count) {
      totalCount += item.count;
    }
  });

  return totalCount;
};

export const getTotalPrice = (productList: TProduct[]) =>{
  let total = 0;
  productList.forEach((product) => {
    if (product.count) {
      total += product.count * product.price;
    }
    if (!product.count) {
      total += product.price;
    }
  });
  return total;
};

export const getTotalSale = (price: number, Sale: number | null) => {
  if (!Sale) {
    return 0;
  }
  return Math.round(Sale / 100 * price);
};
