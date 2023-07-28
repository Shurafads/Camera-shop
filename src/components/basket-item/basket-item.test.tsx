import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createFakeProduct, fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import BasketItem from './basket-item';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);
const product = createFakeProduct();

describe('Component: BasketItem', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketItem product={product} onDeleteClick={jest.fn()}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });
});
