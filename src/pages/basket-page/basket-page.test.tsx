import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import BasketPage from './basket-page';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: BasketPage', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket')).toBeInTheDocument();
  });
});
