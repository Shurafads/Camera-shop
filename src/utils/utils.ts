import { TProduct } from '../types/product';

export const scrollWindowToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

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
