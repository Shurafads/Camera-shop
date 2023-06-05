import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReviewsData } from '../../types/state';
import { fetchReviewsAction } from '../api-action';

const initialState: TReviewsData = {
  ReviewsList: [],
};

export const reviewsData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.ReviewsList = action.payload;
      });
  }
});
