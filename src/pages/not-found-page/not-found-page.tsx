import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classes from './not-found-page.module.css';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - страница не найдена</title>
      </Helmet>
      <div className={classes.container}>
        <h1 className={`title ${classes.title}`}>404 Страница не найдена</h1>
        <Link className={`btn btn--purple ${classes.link}`} to={AppRoute.Catalog}>Вернуться на главную страницу</Link>
      </div>
    </>
  );
}
