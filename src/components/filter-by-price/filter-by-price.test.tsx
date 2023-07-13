import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import FilterByPrice from './filter-by-price';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

const isResetFilter = true;

describe('Component: FilterByPrice', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FilterByPrice isResetFilter={isResetFilter}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
