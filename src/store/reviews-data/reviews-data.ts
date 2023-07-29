import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TReviewsData } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-action';
import { toast } from 'react-toastify';
import { sortDate } from '../../utils/sort';

export const initialState: TReviewsData = {
  reviewsList: [],
};

export const reviewsData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviewsList = action.payload.sort(sortDate);
      })
      .addCase(fetchReviewsAction.rejected, () => {
        toast.error('Не удалось получить список отзывов');
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewsList = [ action.payload, ...state.reviewsList];
      })
      .addCase(postReviewAction.rejected, () => {
        toast.info('Не удалось отправить отзыв, попробуйте еще раз');
      });
  }
});
