import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import ModalReview from './modal-review';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: ModalReview', () => {

  it('should render correctly if isActive={true}', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ModalReview isActive onCloseModal={jest.fn()} onSubmitModal={jest.fn()}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
  });
});
