import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, PRODUCTS_PER_PAGE } from '../../const';
import { TCamerasData } from '../../types/state';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-action';
import { toast } from 'react-toastify';

const initialState: TCamerasData = {
  ProductsList: [],
  ProductsOnPage: [],
  ProductInfo: null,
  SimilarProductsList: [],
  isLoadingProductsList: true,
  isLoadingProducInfo: true,
};

export const productsData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    changeProductsAction: (state, action: PayloadAction<number[]>) => {
      const [firstProduct, lastProduct] = action.payload;
      state.ProductsOnPage = state.ProductsList.slice(firstProduct, lastProduct);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isLoadingProductsList = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.ProductsList = action.payload;
        state.ProductsOnPage = state.ProductsList.slice(0, PRODUCTS_PER_PAGE);
        state.isLoadingProductsList = false;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        toast.error('Не удалось загрузить данные о продуктах, попробуйте позже');
        state.isLoadingProductsList = false;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isLoadingProducInfo = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.ProductInfo = action.payload;
        state.isLoadingProducInfo = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        toast.error('Не удалось загрузить данные продуктe, попробуйте позже');
        state.isLoadingProducInfo = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.SimilarProductsList = action.payload;
      });
  }
});

export const { changeProductsAction } = productsData.actions;
