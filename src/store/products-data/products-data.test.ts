import { createFakeProduct } from '../../utils/mock';
import { fetchProductAction, fetchProductsAction, fetchSimilarProductsAction } from '../api-action';
import { initialState, productsData } from './products-data';

const products = [createFakeProduct(), createFakeProduct()];
const productInfo = createFakeProduct();

describe('Reducer: productsData', () => {

  it('without additional parameters should return initial state', () => {
    expect(productsData.reducer(undefined , {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  describe('getProducts', () => {
    it('should set loading productList status "true"', () => {
      expect(productsData.reducer(initialState, {type: fetchProductsAction.pending.type}))
        .toEqual({...initialState, isLoadingProductsList: true});
    });

    it('should update products by load products', () => {
      expect(productsData.reducer(initialState, {type: fetchProductsAction.fulfilled.type, payload: products}))
        .toEqual({...initialState, productsList: products, isLoadingProductsList: false});
    });

    it('should show error if server is unavailable', () => {
      expect(productsData.reducer(initialState, {type: fetchProductsAction.rejected.type}))
        .toEqual({...initialState, isLoadingProductsList: false});
    });
  });

  describe('getProductInfo', () => {
    it('should set loading product info status "true"', () => {
      expect(productsData.reducer(initialState, {type: fetchProductAction.pending.type}))
        .toEqual({...initialState, isLoadingProducInfo: true});
    });

    it('should update product info by load product info', () => {
      expect(productsData.reducer(initialState, {type: fetchProductAction.fulfilled.type, payload: productInfo}))
        .toEqual({...initialState, productInfo, isLoadingProducInfo: false});
    });

    it('should show error if server is unavailable', () => {
      expect(productsData.reducer(initialState, {type: fetchProductAction.rejected.type}))
        .toEqual({...initialState, isLoadingProducInfo: false});
    });
  });

  describe('getSimilarProducts', () => {

    it('should update similar products by load products', () => {
      expect(productsData.reducer(initialState, {type: fetchSimilarProductsAction.fulfilled.type, payload: productInfo}))
        .toEqual({...initialState, similarProductsList: productInfo});
    });

    it('should show error if server is unavailable', () => {
      expect(productsData.reducer(initialState, {type: fetchSimilarProductsAction.rejected.type}))
        .toEqual({...initialState});
    });
  });
});
