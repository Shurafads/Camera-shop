import { useForm } from 'react-hook-form';
import { TCoupon } from '../../types/basket';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkCouponAction } from '../../store/api-action';
import { getCouponValidStatus } from '../../store/basket-data/basket-data.selectors';
import { CouponStatus } from '../../const';
import { ChangeEvent, useEffect, useState } from 'react';
import { removeValidStatus } from '../../store/basket-data/basket-data';

export default function BasketPromo() {

  const dispatch = useAppDispatch();
  const couponValidStatus = useAppSelector(getCouponValidStatus);

  const [state, setState] = useState('');

  useEffect(() => {

    if (couponValidStatus !== CouponStatus.Unknown) {
      dispatch(removeValidStatus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
  } = useForm<TCoupon>({
    mode: 'onBlur',
  });

  const inputClassName = () => {
    if (couponValidStatus === CouponStatus.NoValid) {
      return 'custom-input is-invalid';
    }
    if (couponValidStatus === CouponStatus.Valid) {
      return 'custom-input is-valid';
    }
    return 'custom-input';
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setState(evt.target.value.replace(/\s/g, ''));
  };

  const handleFormSubmit = handleSubmit((data) => {
    if (!data.coupon) {
      return;
    }
    const couponData: TCoupon = {
      coupon: data.coupon,
    };
    dispatch(checkCouponAction(couponData));
  });

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form method="post" onSubmit={(evt) => void handleFormSubmit(evt)}>
          <div className={inputClassName()}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                {...register('coupon')}
                value={state}
                onChange={handleInputChange}
              />
            </label>
            {couponValidStatus === CouponStatus.NoValid && <p className="custom-input__error" style={{opacity: '100%'}}>Неверный промокод</p>}
            {couponValidStatus === CouponStatus.Valid ? <p className="custom-input__success" style={{opacity: '100%'}}>Промокод принят!</p> : null}
          </div>
          <button className="btn" type="submit">Применить
          </button>
        </form>
      </div>
    </div>
  );
}
