import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { ProductTab } from '../../const';
import TabDescription from './tab-description';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: ProductPage', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <TabDescription currentTab={ProductTab.Description} />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('tab-description')).toBeInTheDocument();
  });
});
