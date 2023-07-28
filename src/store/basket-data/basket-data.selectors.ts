import { CouponStatus, NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';

export const getBasketList = (state: State): TProduct[] => state[NameSpace.Basket].BasketList;

export const getCouponValidStatus = (state: State): CouponStatus => state[NameSpace.Basket].couponValidStatus;

export const getSale = (state: State): number | null => state[NameSpace.Basket].Sale;
