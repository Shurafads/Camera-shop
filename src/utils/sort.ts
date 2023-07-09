import { SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { SortPriceToHigh, SortPriceToLow, SortRatingToHigh, SortRatingToLow } from './utils';

export const sortProductsList = (productsList: TProduct[], type: SortType | null, direction: SortDirection| null) => {

  // let sortedCamerasByType: TProduct[] = [];

  // switch (type) {
  //   case SortType.Popular:
  //     sortedCamerasByType = [...productsList].sort((a, b) => a.rating - b.rating);
  //     break;
  //   case SortType.Price:
  //     sortedCamerasByType = [...productsList].sort((a, b) => b.price - a.price);
  //     break;
  //   default:
  //     sortedCamerasByType = [...productsList];
  //     break;
  // }

  // let sortedCamerasByOrder: TProduct[] = [];

  // switch (direction) {
  //   case SortDirection.Up:
  //     sortedCamerasByOrder = sortedCamerasByType.reverse();
  //     break;
  //   case SortDirection.Down:
  //     sortedCamerasByOrder = sortedCamerasByType;
  //     break;
  //   default:
  //     sortedCamerasByOrder = [...productsList];
  //     break;
  // }

  // return sortedCamerasByOrder;

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
