import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TCamerasData } from '../../types/state';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-action';
import { toast } from 'react-toastify';

const initialState: TCamerasData = {
  ProductsList: [],
  ProductInfo: null,
  SimilarProductsList: [],
};

export const productsData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.ProductsList = action.payload;
      })
      .addCase(fetchProductsAction.rejected, () => {
        toast.error('Не удалось загрузить данные о продуктах, попробуйте позже');
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.ProductInfo = action.payload;
      })
      .addCase(fetchProductAction.rejected, () => {
        toast.error('Не удалось загрузить данные продуктe, попробуйте позже');
      })
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.SimilarProductsList = action.payload;
      });
  }
});
