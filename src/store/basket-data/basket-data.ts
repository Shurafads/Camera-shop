import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CouponStatus, NameSpace } from '../../const';
import { TBasketData } from '../../types/state';
import { TProduct } from '../../types/product';
import { checkCouponAction, sendOrderAction } from '../api-action';
import { toast } from 'react-toastify';

export const initialState: TBasketData = {
  basketList: [],
  sale: null,
  coupon: null,
  couponValidStatus: CouponStatus.Unknown,
  successPopupStatus: false,
  isSendingOrder: false,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.basketList.find((product) => product.id === action.payload.id);

      if (findedProduct && findedProduct.count) {
        findedProduct.count++;
      } else {
        state.basketList = [...state.basketList, {...action.payload, count: 1}];
      }
    },
    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.basketList = state.basketList.filter((product) => product.id !== action.payload);
    },
    changeProductCount: (state, action: PayloadAction<{id: number; count: number}>) => {

      const findedProduct = state.basketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        findedProduct.count = action.payload.count;
      }
    },
    increaseProductCount: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.basketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        state.basketList.map((product) => {
          if (product.id === action.payload.id && product.count) {
            product.count++;
          }
          return product;
        });
      }
    },
    decreaseProductCount: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.basketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        state.basketList.map((product) => {
          if (product.id === action.payload.id && product.count) {
            product.count--;
          }
          return product;
        });
      }
    },
    removeValidStatus: (state) => {
      state.couponValidStatus = CouponStatus.Unknown;
    },
    setCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
    closeSuccessPopup: (state) => {
      state.successPopupStatus = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkCouponAction.fulfilled, (state, action) => {
        state.sale = action.payload;
        state.couponValidStatus = CouponStatus.Valid;
      })
      .addCase(checkCouponAction.rejected, (state) => {
        state.couponValidStatus = CouponStatus.NoValid;
      })
      .addCase(sendOrderAction.pending, (state) => {
        state.isSendingOrder = true;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.basketList = [];
        state.sale = null;
        state.couponValidStatus = CouponStatus.Unknown;
        state.coupon = null;
        state.successPopupStatus = true;
        state.isSendingOrder = false;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        toast.error('Не удалось разместить заказ, попробуйте еще раз');
        state.isSendingOrder = false;
      });
  }
});

export const {
  addProductToBasket,
  removeProductFromBasket,
  changeProductCount,
  increaseProductCount,
  decreaseProductCount,
  removeValidStatus,
  setCoupon,
  closeSuccessPopup
} = basketData.actions;
