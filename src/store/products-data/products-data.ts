import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamerasData } from '../../types/state';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-action';
import { toast } from 'react-toastify';

export const initialState: TCamerasData = {
  productsList: [],
  productInfo: null,
  similarProductsList: [],
  isLoadingProductsList: true,
  isLoadingProducInfo: true,
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
        state.productsList = action.payload;
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
        state.productInfo = action.payload;
        state.isLoadingProducInfo = false;
      })
      .addCase(fetchProductAction.rejected, (state) => {
        toast.error('Не удалось загрузить данные продуктe, попробуйте позже');
        state.isLoadingProducInfo = false;
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProductsList = action.payload;
      })
      .addCase(fetchSimilarProductsAction.rejected, () => {
        toast.error('Не удалось загрузить данные о похожих продуктов');
      });
  }
});

