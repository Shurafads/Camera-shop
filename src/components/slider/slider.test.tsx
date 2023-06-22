import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeStore } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import Slider from './slider';

const history = createMemoryHistory();
const store = fakeStore();
const mockStore = configureMockStore()(store);

describe('Component: Slider', () => {

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Slider onBuyClick={jest.fn()}/>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});
