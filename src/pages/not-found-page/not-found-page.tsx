import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import classes from './not-found-page.module.css';

export default function NotFoundPage() {
  return (
    <div className={classes.container}>
      <h1 className={`title title-h1 ${classes.title}`}>404 Страница не найдена</h1>
      <Link className={`btn btn--purple ${classes.link}`} to={AppRoute.Catalog}>Вернуться на главную страницу</Link>
    </div>
  );
}
