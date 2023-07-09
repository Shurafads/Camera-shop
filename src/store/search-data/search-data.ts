import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortDirection, SortType } from '../../const';
import { TSearchData } from '../../types/state';

export const initialState: TSearchData = {
  Page: 1,
  SortType: null,
  SortDirection: null,
  MinPrice: 0,
  MaxPrice: 0,
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {
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
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.Page = action.payload;
    },
    changePrice: (state, action: PayloadAction<number[]>) => {
      const [minPrice, maxPrice] = action.payload;
      state.MinPrice = minPrice;
      state.MaxPrice = maxPrice;
    },
  },
});

export const { changeSortType, changeSortDirection, changeCurrentPage, changePrice } = searchData.actions;
