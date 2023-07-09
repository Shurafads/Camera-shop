import { NameSpace, SortDirection, SortType } from '../../const';
import { State } from '../../types/state';

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Search].SortType;

export const getCurrentSortDirection = (state: State): SortDirection | null => state[NameSpace.Search].SortDirection;

export const getCurrentPage = (state: State): number => state[NameSpace.Search].Page;

export const getcurrentMinPrice = (state: State): number => state[NameSpace.Search].MinPrice;

export const getcurrentMaxPrice = (state: State): number => state[NameSpace.Search].MaxPrice;
