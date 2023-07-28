import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CouponStatus, NameSpace } from '../../const';
import { TBasketData } from '../../types/state';
import { TProduct } from '../../types/product';
import { checkCouponAction, sendOrderAction } from '../api-action';
import { toast } from 'react-toastify';

export const initialState: TBasketData = {
  BasketList: [],
  Sale: null,
  Coupon: null,
  CouponValidStatus: CouponStatus.Unknown,
  SuccessPopupStatus: false,
  IsSendingOrder: false,
};

export const basketData = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addProductToBasket: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.BasketList.find((product) => product.id === action.payload.id);

      if (findedProduct && findedProduct.count) {
        findedProduct.count++;
      } else {
        state.BasketList = [...state.BasketList, {...action.payload, count: 1}];
      }
    },
    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.BasketList = state.BasketList.filter((product) => product.id !== action.payload);
    },
    changeProductCount: (state, action: PayloadAction<{id: number; count: number}>) => {

      const findedProduct = state.BasketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        findedProduct.count = action.payload.count;
      }
    },
    increaseProductCount: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.BasketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        state.BasketList.map((product) => {
          if (product.id === action.payload.id && product.count) {
            product.count++;
          }
          return product;
        });
      }
    },
    decreaseProductCount: (state, action: PayloadAction<TProduct>) => {

      const findedProduct = state.BasketList.find((product) => product.id === action.payload.id);

      if (findedProduct) {
        state.BasketList.map((product) => {
          if (product.id === action.payload.id && product.count) {
            product.count--;
          }
          return product;
        });
      }
    },
    removeValidStatus: (state) => {
      state.CouponValidStatus = CouponStatus.Unknown;
    },
    setCoupon: (state, action: PayloadAction<string>) => {
      state.Coupon = action.payload;
    },
    closeSuccessPopup: (state) => {
      state.SuccessPopupStatus = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkCouponAction.fulfilled, (state, action) => {
        state.Sale = action.payload;
        state.CouponValidStatus = CouponStatus.Valid;
      })
      .addCase(checkCouponAction.rejected, (state) => {
        state.CouponValidStatus = CouponStatus.NoValid;
      })
      .addCase(sendOrderAction.pending, (state) => {
        state.IsSendingOrder = true;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.BasketList = [];
        state.Sale = null;
        state.CouponValidStatus = CouponStatus.Unknown;
        state.Coupon = null;
        state.SuccessPopupStatus = true;
        state.IsSendingOrder = false;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        toast.error('Не удалось разместить заказ, попробуйте еще раз');
        state.IsSendingOrder = false;
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
