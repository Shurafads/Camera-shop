import ReactFocusLock from 'react-focus-lock';
import { useAppDispatch, useAppSelector } from '../../store';
import { sendOrderAction } from '../../store/api-action';
import { getBasketList, getCoupon, getSale, getSendingOrderStatus, getSuccessPopupStatus } from '../../store/basket-data/basket-data.selectors';
import { getTotalPrice, getTotalSale } from '../../utils/utils';
import ModalBasketSuccess from '../modal-basket-success/modal-basket-success';

export default function BasketOrder() {

  const dispatch = useAppDispatch();
  const basketList = useAppSelector(getBasketList);
  const sale = useAppSelector(getSale);
  const coupon = useAppSelector(getCoupon);
  const accessPopupStatus = useAppSelector(getSuccessPopupStatus);
  const isSendingOrder = useAppSelector(getSendingOrderStatus);

  const totalPrice = getTotalPrice(basketList);
  const totalSale = getTotalSale(totalPrice, sale);

  const summaryPrice = totalPrice - totalSale;

  const camerasIds = basketList.reduce((acc: number[], product) => {
    acc.push(product.id);
    return acc;
  }, []);

  const handleButtonClick = () => {

    const orderData = {
      camerasIds,
      coupon,
    };

    dispatch(sendOrderAction(orderData));
  };

  return (
    <>
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
        <button className="btn btn--purple" type="submit" onClick={handleButtonClick} disabled={!basketList.length || isSendingOrder}>
          Оформить заказ
        </button>
      </div>
      <ReactFocusLock>
        <ModalBasketSuccess isActive={accessPopupStatus}/>
      </ReactFocusLock>
    </>
  );
}
