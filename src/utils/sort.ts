import { SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { SortPriceToHigh, SortPriceToLow, SortRatingToHigh, SortRatingToLow } from './utils';

export const sortProductsList = (productsList: TProduct[], sortType: SortType | null, direction: SortDirection| null) => {

  let sortedProductsList = [...productsList];

  if (sortType === SortType.Price && direction === SortDirection.Up) {
    sortedProductsList = [...productsList].sort(SortPriceToHigh);
    return sortedProductsList;
  }

  if (sortType === SortType.Price && direction === SortDirection.Down) {
    sortedProductsList = [...productsList].sort(SortPriceToLow);
    return sortedProductsList;
  }

  if (sortType === SortType.Popular && direction === SortDirection.Up) {
    sortedProductsList = [...productsList].sort(SortRatingToHigh);
    return sortedProductsList;
  }

  if (sortType === SortType.Popular && direction === SortDirection.Down) {
    sortedProductsList = [...productsList].sort(SortRatingToLow);
    return sortedProductsList;
  }

  return sortedProductsList;
};
