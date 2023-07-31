import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import ProductPage from './product-page';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: ProductPage', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('prouct-page-content')).toBeInTheDocument();
  });
});
