import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createFakeProduct, fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import Card from './card';

const product = createFakeProduct();
const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: Card', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Card product={product} onBuyClick={jest.fn()}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего оценок/)).toBeInTheDocument();
    expect(screen.getByText(/Цена/)).toBeInTheDocument();
  });
});
