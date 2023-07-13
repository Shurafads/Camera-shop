import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createFakeProduct, fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import SearchItem from './search-item';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

const product = createFakeProduct();
const currentItemIndex = 1;
const index = 1;
const setIsOpen = jest.fn();

describe('Component: SearchItem', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <SearchItem product={product} setIsOpen={setIsOpen} isActive={currentItemIndex === index}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-item')).toBeInTheDocument();
  });
});
