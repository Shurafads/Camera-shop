import { CouponStatus } from '../../const';
import { createFakeProduct } from '../../utils/mock';
import { checkCouponAction, sendOrderAction } from '../api-action';
import {
  addProductToBasket,
  basketData,
  changeProductCount,
  closeSuccessPopup,
  decreaseProductCount,
  increaseProductCount,
  initialState,
  removeProductFromBasket,
  removeValidStatus,
  setCoupon
} from './basket-data';

const product = createFakeProduct();

describe('Reducer: basketData', () => {

  it('without additional parameters should return initial state', () => {
    expect(basketData.reducer(undefined , {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  it('should update BasketList after getting product', () => {
    expect(basketData.reducer(initialState, addProductToBasket(product)))
      .toEqual({
        ...initialState,
        BasketList: [{...product, count: 1}],
      });
  });

  it('should remove product from BasketList after getting product id', () => {
    expect(basketData.reducer(initialState, removeProductFromBasket(1)))
      .toEqual({
        ...initialState,
        BasketList: [],
      });
  });

  it('should change product count in the BasketList', () => {
    expect(basketData.reducer(initialState, changeProductCount({id: 3, count: 5})))
      .toEqual({
        ...initialState,
        BasketList: [],
      });
  });

  it('should increase product count in the BasketList', () => {
    expect(basketData.reducer(initialState, increaseProductCount(product)))
      .toEqual({
        ...initialState,
        BasketList: [],
      });
  });

  it('should decrease product count in the BasketList', () => {
    expect(basketData.reducer(initialState, decreaseProductCount(product)))
      .toEqual({
        ...initialState,
        BasketList: [],
      });
  });

  it('should change CouponValidStatus', () => {
    expect(basketData.reducer(initialState, removeValidStatus()))
      .toEqual({
        ...initialState,
        CouponValidStatus: CouponStatus.Unknown,
      });
  });

  it('should set coupon', () => {
    expect(basketData.reducer(initialState, setCoupon('camera-333')))
      .toEqual({
        ...initialState,
        Coupon: 'camera-333',
      });
  });

  it('should set SuccessPopupStatus "false"', () => {
    expect(basketData.reducer(initialState, closeSuccessPopup()))
      .toEqual({
        ...initialState,
        SuccessPopupStatus: false,
      });
  });

  describe('checkCoupon', () => {
    it('should set Sale and CouponValidStatus "VALID"', () => {
      expect(basketData.reducer(initialState, {type: checkCouponAction.fulfilled.type, payload: 15}))
        .toEqual({...initialState, Sale: 15, CouponValidStatus: CouponStatus.Valid});
    });

    it('should set CouponValidStatus "NO_VALID"', () => {
      expect(basketData.reducer(initialState, {type: checkCouponAction.rejected.type}))
        .toEqual({...initialState, CouponValidStatus: CouponStatus.NoValid});
    });
  });

  describe('sendOrder', () => {
    it('should set IsSendingOrder "true"', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.pending.type}))
        .toEqual({...initialState, IsSendingOrder: true});
    });

    it('should reset state', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.fulfilled.type}))
        .toEqual({...initialState,
          BasketList: [],
          Sale: null,
          CouponValidStatus: CouponStatus.Unknown,
          SuccessPopupStatus: true,
          IsSendingOrder: false,
        });
    });

    it('should set IsSendingOrder "false"', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.rejected.type}))
        .toEqual({...initialState, IsSendingOrder: false});
    });
  });
});
