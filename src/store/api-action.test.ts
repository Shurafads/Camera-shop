import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { createFakeProduct } from '../utils/mock';
import { ApiRoute } from '../const';
import { fetchProductsAction } from './api-action';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Products when GET /cameras', async () => {
    const products = [createFakeProduct(), createFakeProduct()];
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(200, products);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type,
    ]);
  });
});
