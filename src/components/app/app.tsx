import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import Layout from '../layout/layout';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Navigate to={AppRoute.Catalog}/>}/>
          <Route path={AppRoute.Catalog} element={<CatalogPage/>}/>
          <Route path={AppRoute.Product}>
            <Route path={':id'} element={<ProductPage />}/>
          </Route>
          <Route path={'*'} element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
