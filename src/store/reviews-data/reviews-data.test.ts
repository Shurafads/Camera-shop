import { createFakeReview } from '../../utils/mock';
import { fetchReviewsAction, postReviewAction } from '../api-action';
import { initialState, reviewsData } from './reviews-data';

const review = [createFakeReview(), createFakeReview()];
const userReview = createFakeReview();

describe('Reducer: reviewData', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined , {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  describe('getReviews', () => {

    it('should update review list by load review', () => {
      expect(reviewsData.reducer(initialState, {type: fetchReviewsAction.fulfilled.type, payload: review}))
        .toEqual({...initialState, ReviewsList: review});
    });

    it('should show error if server is unavailable', () => {
      expect(reviewsData.reducer(initialState, {type: fetchReviewsAction.rejected.type}))
        .toEqual({...initialState});
    });
  });

  describe('postReview', () => {

    it('should add a new review', () => {
      expect(reviewsData.reducer(initialState, {type: postReviewAction.fulfilled.type, payload: userReview}))
        .toEqual({...initialState, ReviewsList: [userReview]});
    });

    it('should show error if server is unavailable', () => {
      expect(reviewsData.reducer(initialState, {type: postReviewAction.rejected.type}))
        .toEqual({...initialState});
    });
  });

});
