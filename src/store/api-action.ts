import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../types/product';
import { ApiRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { TPromo } from '../types/promo';
import { TReview, TUserReview } from '../types/review';

export const fetchProductsAction = createAsyncThunk<TProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductsAction',
  async (_arg, {extra: api}) => {

    const {data: productsList} = await api.get<TProduct[]>(ApiRoute.Cameras);

    for (let i = 0; i < productsList.length; i++) {
      const {data: reviewList} = await api.get<TReview[]>(`${ApiRoute.Cameras}/${productsList[i].id}/reviews`);

      const ProductRating = +(reviewList.reduce((acc, review) => acc + review.rating, 0) / reviewList.length).toFixed(1);

      productsList[i] = { ...productsList[i], rating: ProductRating};
    }

    return productsList;
  }
);

export const fetchProductAction = createAsyncThunk<TProduct, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductAction',
  async (productId, {extra: api}) => {

    const {data: product} = await api.get<TProduct>(`${ApiRoute.Cameras}/${productId}`);

    const {data: productReview} = await api.get<TReview[]>(`${ApiRoute.Cameras}/${product.id}/reviews`);

    const ProductRating = +(productReview.reduce((acc, review) => acc + review.rating, 0) / productReview.length).toFixed(1);
    const ProductWithRating = {...product, rating: ProductRating};

    return ProductWithRating;
  }
);

export const fetchSimilarProductsAction = createAsyncThunk<TProduct[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchSimilarProductsAction',
  async (productId, {extra: api}) => {

    const {data} = await api.get<TProduct[]>(`${ApiRoute.Cameras}/${productId}/similar`);

    const productList = [...data];

    for (let i = 0; i < productList.length; i++) {
      const {data: reviewList} = await api.get<TReview[]>(`${ApiRoute.Cameras}/${productList[i].id}/reviews`);

      const ProductRating = Math.round(reviewList.reduce((acc, review) => acc + review.rating, 0) / reviewList.length);

      productList[i] = { ...productList[i], rating: ProductRating};
    }

    return productList;
  }
);

export const fetchPromoAction = createAsyncThunk<TPromo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'promo/fetchPromoAction',
  async (_arg, {extra: api}) => {

    const {data} = await api.get<TPromo>(ApiRoute.Promo);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<TReview[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/fetchReviewsAction',
  async (productId, {extra: api}) => {

    const {data} = await api.get<TReview[]>(`${ApiRoute.Cameras}/${productId}/reviews`);

    return data;
  }
);

export const postReviewAction = createAsyncThunk<TReview, TUserReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'review/postReviewAction',
  async ({cameraId, userName, advantage, disadvantage, review, rating, reset, onSubmitModal}, {extra: api}) => {

    const {data} = await api.post<TReview>('/reviews', {cameraId, userName, advantage, disadvantage, review, rating});

    onSubmitModal();
    reset();

    return data;
  }
);
