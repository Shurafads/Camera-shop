import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TBasketData } from '../../types/state';
import { TProduct } from '../../types/product';

export const initialState: TBasketData = {
  BasketList: [],
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
    deleteProductFromBasket: (state, action: PayloadAction<number>) => {
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
  }
});

export const { addProductToBasket, deleteProductFromBasket, changeProductCount, increaseProductCount, decreaseProductCount } = basketData.actions;
