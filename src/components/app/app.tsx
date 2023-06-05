import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from '../../pages/catalog';
import { AppRoute } from '../../const';
import Header from '../header/header';
import Footer from '../footer/footer';
import { HelmetProvider } from 'react-helmet-async';
import Product from '../../pages/product';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path={AppRoute.Catalog} element={<Catalog />}/>
            <Route path={`${AppRoute.Product}/:id`} element={<Product />}/>
          </Routes>
          <Footer />
        </div>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
