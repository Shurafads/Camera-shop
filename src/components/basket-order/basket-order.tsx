import { useAppSelector } from '../../store';
import { getBasketList } from '../../store/basket-data/basket-data.selectors';
import { getTotalPrice } from '../../utils/utils';

export default function BasketOrder() {

  const basketList = useAppSelector(getBasketList);

  const totalPrice = getTotalPrice(basketList);

  const summaryPrice = totalPrice;

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice.toLocaleString()} ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
      <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryPrice.toLocaleString()} ₽</span></p>
      <button className="btn btn--purple" type="submit">
        Оформить заказ
      </button>
    </div>
  );
}
