import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import Banner from './banner';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: Banner', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Banner />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
