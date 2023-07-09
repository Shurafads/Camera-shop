import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';
import { sortProductsList } from '../../utils/sort';
import { getCurrentSortDirection, getCurrentSortType, getcurrentMaxPrice, getcurrentMinPrice } from '../search-data/search-data.selectors';
import { filterProductsList } from '../../utils/filter';

export const getProductsList = (state: State): TProduct[] => state[NameSpace.Product].CopyProductsList; // test

export const getSortedProductsList = createSelector(
  [getProductsList, getCurrentSortType, getCurrentSortDirection],
  (productsList, type, direction) => sortProductsList(productsList, type, direction)
);

export const getFiltredProductsList = createSelector(
  [getProductsList, getCurrentSortType, getCurrentSortDirection, getcurrentMinPrice, getcurrentMaxPrice],
  (productsList, type, direction, minPrice, maxPrice) => filterProductsList(productsList, type, direction, minPrice, maxPrice)
);

// export const getFiltredProductsList = createSelector(
//   [getSortedProductsList, getcurrentMinPrice, getcurrentMaxPrice],
//   (productsList, minPrice, maxPrice) => filterProductsList(productsList, minPrice, maxPrice)
// );

export const getProductInfo = (state: State): TProduct | null => state[NameSpace.Product].ProductInfo;

export const getSimilarProductsList = (state: State): TProduct[] => state[NameSpace.Product].SimilarProductsList;

export const getIsLoadingProductsList = (state: State): boolean => state[NameSpace.Product].isLoadingProductsList;

export const getIsLoadingProducInfo = (state: State): boolean => state[NameSpace.Product].isLoadingProducInfo;
