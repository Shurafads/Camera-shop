import { NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';

export const getProductsList = (state: State): TProduct[] => state[NameSpace.Product].ProductsList;

export const getProductInfo = (state: State): TProduct | null => state[NameSpace.Product].ProductInfo;

export const getSimilarProductsList = (state: State): TProduct[] => state[NameSpace.Product].SimilarProductsList;

export const getProductsOnPage = (state: State): TProduct[] => state[NameSpace.Product].ProductsOnPage;
