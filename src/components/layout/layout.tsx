import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

export default function Layout() {
  return (
    <div className="wrapper" data-testid="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
