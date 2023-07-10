import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamerasData } from '../../types/state';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-action';
import { toast } from 'react-toastify';

export const initialState: TCamerasData = {
  ProductsList: [],
  ProductInfo: null,
  SimilarProductsList: [],
  isLoadingProductsList: true,
  isLoadingProducInfo: true,
  isLoadingSimilarProducts: true,
};

export const productsData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isLoadingProductsList = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.ProductsList = action.payload;
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
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.isLoadingSimilarProducts = true;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.SimilarProductsList = action.payload;
        state.isLoadingSimilarProducts = false;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state) => {
        toast.error('Не удалось загрузить данные о похожих продуктов');
        state.isLoadingSimilarProducts = false;
      });
  }
});

