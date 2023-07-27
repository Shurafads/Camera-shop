import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { productsData } from './products-data/products-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './reviews-data/reviews-data';
import { searchData } from './search-data/search-data';
import { basketData } from './basket-data/basket-data';

export const rootReducer = combineReducers({
  [NameSpace.Product]: productsData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Review]: reviewsData.reducer,
  [NameSpace.Search]: searchData.reducer,
  [NameSpace.Basket]: basketData.reducer,
});
