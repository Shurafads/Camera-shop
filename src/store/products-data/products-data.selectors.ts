import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';
import { sortProductsList } from '../../utils/sort';
import { getCurrentSortDirection, getCurrentSortType, getCurrentCategory, getCurrentMaxPrice, getCurrentMinPrice, getCurrentFilterType, getCurrentLevel } from '../search-data/search-data.selectors';
import { filterProductsList } from '../../utils/filter';

export const getProductsList = (state: State): TProduct[] => state[NameSpace.Product].ProductsList;

export const getSortedProductsList = createSelector(
  [getProductsList, getCurrentSortType, getCurrentSortDirection],
  (productsList, type, direction) => sortProductsList(productsList, type, direction)
);

export const getFiltredProductsList = createSelector(
  [getProductsList, getCurrentSortType, getCurrentSortDirection, getCurrentMinPrice, getCurrentMaxPrice, getCurrentCategory, getCurrentFilterType, getCurrentLevel],
  (productsList, sortType, direction, minPrice, maxPrice, category, filterType, level) =>
    filterProductsList(productsList, sortType, direction, minPrice, maxPrice, category, filterType, level)
);

// export const getFiltredProductsList = createSelector(
//   [getSortedProductsList, getCurrentMinPrice, getCurrentMaxPrice],
//   (productsList, minPrice, maxPrice) => filteredProductsList(productsList, minPrice, maxPrice)
// );

export const getProductInfo = (state: State): TProduct | null => state[NameSpace.Product].ProductInfo;

export const getSimilarProductsList = (state: State): TProduct[] => state[NameSpace.Product].SimilarProductsList;

export const getIsLoadingProductsList = (state: State): boolean => state[NameSpace.Product].isLoadingProductsList;

export const getIsLoadingProducInfo = (state: State): boolean => state[NameSpace.Product].isLoadingProducInfo;
