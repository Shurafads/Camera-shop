import { CouponStatus, NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';

export const getBasketList = (state: State): TProduct[] => state[NameSpace.Basket].basketList;

export const getSale = (state: State): number | null => state[NameSpace.Basket].sale;

export const getCoupon = (state: State): string| null => state[NameSpace.Basket].coupon;

export const getCouponValidStatus = (state: State): CouponStatus => state[NameSpace.Basket].couponValidStatus;

export const getSuccessPopupStatus = (state: State): boolean => state[NameSpace.Basket].successPopupStatus;

export const getSendingOrderStatus = (state: State): boolean => state[NameSpace.Basket].isSendingOrder;
