import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { productsData } from './products-data/products-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './reviews-data/reviews-data';
import { searchData } from './search-data/search-data';
import { basketData } from './basket-data/basket-data';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [NameSpace.Basket]
};

const rootReducer = combineReducers({
  [NameSpace.Product]: productsData.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Review]: reviewsData.reducer,
  [NameSpace.Search]: searchData.reducer,
  [NameSpace.Basket]: basketData.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
