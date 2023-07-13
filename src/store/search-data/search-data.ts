import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category, Level, NameSpace, SortDirection, SortType, Type } from '../../const';
import { TSearchData } from '../../types/state';

export const initialState: TSearchData = {
  Page: 1,
  SortType: null,
  SortDirection: null,
  MinPrice: 0,
  MaxPrice: 0,
  Category: null,
  FilterType: [],
  Level: [],
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.Page = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortType | null>) => {
      state.SortType = action.payload;

      if (!state.SortDirection) {
        state.SortDirection = SortDirection.Up;
      }
    },
    changeSortDirection: (state, action: PayloadAction<SortDirection | null>) => {
      state.SortDirection = action.payload;

      if (!state.SortType) {
        state.SortType = SortType.Price;
      }
    },
    changeMinPrice: (state, action: PayloadAction<number>) => {
      state.MinPrice = action.payload;
    },
    changeMaxPrice: (state, action: PayloadAction<number>) => {
      state.MaxPrice = action.payload;
    },
    changeCategory: (state, action: PayloadAction<Category | null>) => {
      state.Category = action.payload;
    },
    changeType: (state, action: PayloadAction<Type[]>) => {
      state.FilterType = action.payload;
    },
    changeLevel: (state, action: PayloadAction<Level[]>) => {
      state.Level = action.payload;
    },
    resetFilter: (state) => {
      state.MinPrice = 0;
      state.MaxPrice = 0;
      state.Category = null;
      state.FilterType = [];
      state.Level = [];
    },
  },
});

export const { changeSortType, changeSortDirection, changeCurrentPage, changeMinPrice, changeMaxPrice, changeCategory, changeType, changeLevel, resetFilter } = searchData.actions;
