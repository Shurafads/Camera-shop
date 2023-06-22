import { render, screen } from '@testing-library/react';
import App from './app';
import { createMemoryHistory } from 'history';
import { createFakeProductInfo, fakeStore } from '../../utils/mock';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import { createApi } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';

const fakeProductInfo = createFakeProductInfo();
const history = createMemoryHistory();
const store = fakeStore();

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action<string>>
>(middlewares)(store);

const fakeApp = (
  <Provider store={mockStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter >
  </Provider>
);

describe('Application Routing', () => {
  it('should render CatalogPage when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render CatalogPage when user navigate to "/catalog"', () => {
    history.push(AppRoute.Catalog);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render ProductPage when user navigate to "/catalog/id"', () => {

    history.push(`${AppRoute.Product}/${fakeProductInfo.id}`);

    render(fakeApp);

    expect(screen.getByTestId('product-content-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to "/*"', () => {

    history.push('/*');

    render(fakeApp);

    expect(screen.getByText('404 Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную страницу')).toBeInTheDocument();
  });
});
