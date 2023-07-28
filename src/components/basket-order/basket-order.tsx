import { useAppSelector } from '../../store';
import { getBasketList, getSale } from '../../store/basket-data/basket-data.selectors';
import { getTotalPrice } from '../../utils/utils';

export default function BasketOrder() {

  const basketList = useAppSelector(getBasketList);
  const sale = useAppSelector(getSale);

  const totalPrice = getTotalPrice(basketList);
  const getTotalSale = (price: number, Sale: number | null) => {
    if (!Sale) {
      return 0;
    }
    return Math.round(Sale / 100 * price);
  };
  const totalSale = getTotalSale(totalPrice, sale);

  const summaryPrice = totalPrice - totalSale;

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={`basket__summary-value basket__${sale ? 'summary-value--bonus' : ''}`}>{totalSale.toLocaleString()} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{summaryPrice.toLocaleString()} ₽</span>
      </p>
      <button className="btn btn--purple" type="submit">
        Оформить заказ
      </button>
    </div>
  );
}
