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

  it('should update basketList after getting product', () => {
    expect(basketData.reducer(initialState, addProductToBasket(product)))
      .toEqual({
        ...initialState,
        basketList: [{...product, count: 1}],
      });
  });

  it('should remove product from basketList after getting product id', () => {
    expect(basketData.reducer(initialState, removeProductFromBasket(1)))
      .toEqual({
        ...initialState,
        basketList: [],
      });
  });

  it('should change product count in the basketList', () => {
    expect(basketData.reducer(initialState, changeProductCount({id: 3, count: 5})))
      .toEqual({
        ...initialState,
        basketList: [],
      });
  });

  it('should increase product count in the basketList', () => {
    expect(basketData.reducer(initialState, increaseProductCount(product)))
      .toEqual({
        ...initialState,
        basketList: [],
      });
  });

  it('should decrease product count in the basketList', () => {
    expect(basketData.reducer(initialState, decreaseProductCount(product)))
      .toEqual({
        ...initialState,
        basketList: [],
      });
  });

  it('should change couponValidStatus', () => {
    expect(basketData.reducer(initialState, removeValidStatus()))
      .toEqual({
        ...initialState,
        couponValidStatus: CouponStatus.Unknown,
      });
  });

  it('should set coupon', () => {
    expect(basketData.reducer(initialState, setCoupon('camera-333')))
      .toEqual({
        ...initialState,
        coupon: 'camera-333',
      });
  });

  it('should set successPopupStatus "false"', () => {
    expect(basketData.reducer(initialState, closeSuccessPopup()))
      .toEqual({
        ...initialState,
        successPopupStatus: false,
      });
  });

  describe('checkCoupon', () => {
    it('should set Sale and couponValidStatus "VALID"', () => {
      expect(basketData.reducer(initialState, {type: checkCouponAction.fulfilled.type, payload: 15}))
        .toEqual({...initialState, sale: 15, couponValidStatus: CouponStatus.Valid});
    });

    it('should set couponValidStatus "NO_VALID"', () => {
      expect(basketData.reducer(initialState, {type: checkCouponAction.rejected.type}))
        .toEqual({...initialState, couponValidStatus: CouponStatus.NoValid});
    });
  });

  describe('sendOrder', () => {
    it('should set isSendingOrder "true"', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.pending.type}))
        .toEqual({...initialState, isSendingOrder: true});
    });

    it('should reset state', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.fulfilled.type}))
        .toEqual({...initialState,
          basketList: [],
          sale: null,
          coupon: null,
          couponValidStatus: CouponStatus.Unknown,
          successPopupStatus: true,
          isSendingOrder: false,
        });
    });

    it('should set isSendingOrder "false"', () => {
      expect(basketData.reducer(initialState, {type: sendOrderAction.rejected.type}))
        .toEqual({...initialState, isSendingOrder: false});
    });
  });
});
