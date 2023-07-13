import { Category, Level, NameSpace, SortDirection, SortType, Type } from '../../const';
import { State } from '../../types/state';

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Search].SortType;

export const getCurrentSortDirection = (state: State): SortDirection | null => state[NameSpace.Search].SortDirection;

export const getCurrentPage = (state: State): number => state[NameSpace.Search].Page;

export const getCurrentMinPrice = (state: State): number => state[NameSpace.Search].MinPrice;

export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Search].MaxPrice;

export const getCurrentCategory = (state: State): Category | null => state[NameSpace.Search].Category;

export const getCurrentFilterType = (state: State): Type[] => state[NameSpace.Search].FilterType;

export const getCurrentLevel = (state: State): Level[] => state[NameSpace.Search].Level;
