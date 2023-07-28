import { CouponStatus, NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';

export const getBasketList = (state: State): TProduct[] => state[NameSpace.Basket].BasketList;

export const getCouponValidStatus = (state: State): CouponStatus => state[NameSpace.Basket].CouponValidStatus;

export const getSale = (state: State): number | null => state[NameSpace.Basket].Sale;

export const getCoupon = (state: State): string| null => state[NameSpace.Basket].Coupon;

export const getSuccessPopupStatus = (state: State): boolean => state[NameSpace.Basket].SuccessPopupStatus;

export const getSendingOrderStatus = (state: State): boolean => state[NameSpace.Basket].IsSendingOrder;
