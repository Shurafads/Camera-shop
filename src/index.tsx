import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { fetchProductsAction, fetchPromoAction } from './store/api-action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingPage from './pages/loading-page/loading-page';

store.dispatch(fetchProductsAction());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <HistoryRouter history={browserHistory}>
          <ToastContainer/>
          <App />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
