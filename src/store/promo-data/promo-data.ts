import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TPromoData } from '../../types/state';
import { fetchPromoAction } from '../api-action';

export const initialState: TPromoData = {
  promo: null,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});
