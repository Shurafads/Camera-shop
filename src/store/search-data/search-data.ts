import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category, Level, NameSpace, SortDirection, SortType, Type } from '../../const';
import { TSearchData } from '../../types/state';

export const initialState: TSearchData = {
  page: 1,
  sortType: null,
  sortDirection: null,
  minPrice: 0,
  maxPrice: 0,
  category: null,
  filterType: [],
  level: [],
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType | null>) => {
      state.sortType = action.payload;

      if (!state.sortDirection) {
        state.sortDirection = SortDirection.Up;
      }
    },
    changeSortDirection: (state, action: PayloadAction<SortDirection | null>) => {
      state.sortDirection = action.payload;

      if (!state.sortType) {
        state.sortType = SortType.Price;
      }
    },
    changeMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    changeMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    changeCategory: (state, action: PayloadAction<Category | null>) => {
      state.category = action.payload;
    },
    changeType: (state, action: PayloadAction<Type[]>) => {
      state.filterType = action.payload;
    },
    changeLevel: (state, action: PayloadAction<Level[]>) => {
      state.level = action.payload;
    },
    resetFilter: (state) => {
      state.minPrice = 0;
      state.maxPrice = 0;
      state.category = null;
      state.filterType = [];
      state.level = [];
    },
  },
});

export const { changeSortType, changeSortDirection, changeCurrentPage, changeMinPrice, changeMaxPrice, changeCategory, changeType, changeLevel, resetFilter } = searchData.actions;
