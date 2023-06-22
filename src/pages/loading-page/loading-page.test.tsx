import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import LoadingPage from './loading-page';
import { fakeStore } from '../../utils/mock';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: LoadingPage', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoadingPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
