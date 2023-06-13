import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReviewsData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-action';
import { SortDate } from '../../utils';
import { toast } from 'react-toastify';

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
        state.ReviewsList = action.payload.sort(SortDate);
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.ReviewsList = [ action.payload, ...state.ReviewsList];
      })
      .addCase(postReviewAction.rejected, () => {
        toast.error('Не удалось отправить отзыв, попробуйте позже');
      });
  }
});
