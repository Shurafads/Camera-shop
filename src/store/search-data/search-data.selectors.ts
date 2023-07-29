import { Category, Level, NameSpace, SortDirection, SortType, Type } from '../../const';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.Search].page;

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Search].sortType;

export const getCurrentSortDirection = (state: State): SortDirection | null => state[NameSpace.Search].sortDirection;

export const getCurrentMinPrice = (state: State): number => state[NameSpace.Search].minPrice;

export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Search].maxPrice;

export const getCurrentCategory = (state: State): Category | null => state[NameSpace.Search].category;

export const getCurrentFilterType = (state: State): Type[] => state[NameSpace.Search].filterType;

export const getCurrentLevel = (state: State): Level[] => state[NameSpace.Search].level;
