import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import NotFoundPage from './not-found-page';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { fakeStore } from '../../utils/mock';

describe('Component: NotFoundPage', () => {

  const history = createMemoryHistory();
  const store = fakeStore();
  const mockStore = configureMockStore()(store);

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <NotFoundPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Страница не найдена')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную страницу')).toBeInTheDocument();
  });
});
