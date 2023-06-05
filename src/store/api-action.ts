import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProduct } from '../types/product';
import { ApiRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { TPromo } from '../types/promo';
import { TReview } from '../types/review';

export const fetchProductsAction = createAsyncThunk<TProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductsAction',
  async (_arg, {extra: api}) => {

    const {data} = await api.get<TProduct[]>(ApiRoute.Cameras);

    return data;
  }
);

export const fetchProductAction = createAsyncThunk<TProduct, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'product/fetchProductAction',
  async (productId, {extra: api}) => {

    const {data} = await api.get<TProduct>(`${ApiRoute.Cameras}/${productId}`);

    return data;
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

    return data;
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
