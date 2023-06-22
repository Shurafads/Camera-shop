import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import ModalSuccess from './modal-success';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: ModalSuccess', () => {

  it('should render correctly if isActive={true}', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ModalSuccess isActive onCloseModal={jest.fn()}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });
});
