import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { createFakeProduct, createFakePromo, createFakeReview, createFakeUserInfo } from '../utils/mock';
import { ApiRoute } from '../const';
import { fetchProductAction, fetchProductsAction, fetchPromoAction, fetchReviewsAction, fetchSimilarProductsAction, postReviewAction } from './api-action';

const api = createApi();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Async actions', () => {

  it('should dispatch fetchProductsAction when GET /cameras', async () => {
    const productsList = [createFakeProduct()];

    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(200, productsList);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.rejected.type,
    ]);
  });

  it('should dispatch fetchProductAction when GET /cameras/id', async () => {
    const productInfo = createFakeProduct();
    const productId = '1';

    mockApi
      .onGet(`${ApiRoute.Cameras}/${productId}`)
      .reply(200, productInfo);

    const store = mockStore();

    await store.dispatch(fetchProductAction(productId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.rejected.type
    ]);
  });

  it('should dispatch fetchSimilarProductsAction when GET /cameras/id/similar', async () => {
    const productInfo = [createFakeProduct(), createFakeProduct()];
    const productId = '1';

    mockApi
      .onGet(`${ApiRoute.Cameras}/${productId}/similar`)
      .reply(200, productInfo);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(productId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.rejected.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    const promoProduct = createFakePromo();

    mockApi
      .onGet(ApiRoute.Promo)
      .reply(200, promoProduct);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/id/reviews', async () => {
    const reviewList = [createFakeReview(), createFakeReview()];
    const productId = '1';

    mockApi
      .onGet(`${ApiRoute.Cameras}/${productId}/reviews`)
      .reply(200, reviewList);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(productId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch postReviewAction when GET /reviews', async () => {
    const userReview = createFakeUserInfo();

    mockApi
      .onPost('/reviews')
      .reply(200, userReview);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    await store.dispatch(postReviewAction(userReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type,
    ]);
  });
});
