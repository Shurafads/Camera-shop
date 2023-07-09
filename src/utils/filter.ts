import { SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { SortPriceToHigh, SortPriceToLow, SortRatingToHigh, SortRatingToLow } from './utils';

export const filterProductsList = (productsList: TProduct[], type: SortType | null, direction: SortDirection| null, minPrice: number, maxPrice: number) => {
  const getSortedProducts = () => {
    let sortedProductsList = [...productsList];

    if (type === SortType.Price && direction === SortDirection.Up) {
      sortedProductsList = [...productsList].sort(SortPriceToHigh);
      return sortedProductsList;
    }

    if (type === SortType.Price && direction === SortDirection.Down) {
      sortedProductsList = [...productsList].sort(SortPriceToLow);
      return sortedProductsList;
    }

    if (type === SortType.Popular && direction === SortDirection.Up) {
      sortedProductsList = [...productsList].sort(SortRatingToHigh);
      return sortedProductsList;
    }

    if (type === SortType.Popular && direction === SortDirection.Down) {
      sortedProductsList = [...productsList].sort(SortRatingToLow);
      return sortedProductsList;
    }

    return sortedProductsList;
  };

  const sortedProducts = getSortedProducts();

  let filtredProdcuts: TProduct[] = sortedProducts;

  if (maxPrice === 0) {
    filtredProdcuts = sortedProducts.filter((product) => product.price >= minPrice);

    return filtredProdcuts;
  }
  filtredProdcuts = sortedProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice);

  return filtredProdcuts;
};
