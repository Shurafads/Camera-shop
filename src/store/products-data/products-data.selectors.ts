import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';
import { getCurrentSortDirection, getCurrentSortType, getCurrentCategory, getCurrentMaxPrice, getCurrentMinPrice, getCurrentFilterType, getCurrentLevel } from '../search-data/search-data.selectors';
import { filterProductsList } from '../../utils/filter';

export const getProductsList = (state: State): TProduct[] => state[NameSpace.Product].productsList;

export const getFiltredProductsList = createSelector(
  [getProductsList, getCurrentSortType, getCurrentSortDirection, getCurrentMinPrice, getCurrentMaxPrice, getCurrentCategory, getCurrentFilterType, getCurrentLevel],
  (productsList, sortType, direction, minPrice, maxPrice, category, filterType, level) =>
    filterProductsList(productsList, sortType, direction, minPrice, maxPrice, category, filterType, level)
);

export const getProductInfo = (state: State): TProduct | null => state[NameSpace.Product].productInfo;

export const getSimilarProductsList = (state: State): TProduct[] => state[NameSpace.Product].similarProductsList;

export const getIsLoadingProductsList = (state: State): boolean => state[NameSpace.Product].isLoadingProductsList;

export const getIsLoadingProducInfo = (state: State): boolean => state[NameSpace.Product].isLoadingProducInfo;
