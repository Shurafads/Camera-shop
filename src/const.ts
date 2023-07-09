export const URL = 'https://camera-shop.accelerator.pages.academy/';

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Basket = '/basket',
  Product = '/product',
}

export enum NameSpace {
  Product = 'PRODUCT',
  Promo = 'PROMO',
  Review = 'REVIEW',
  Search = 'SEARCH'
}

export enum ApiRoute {
  Cameras = '/cameras',
  Promo = '/promo',
}

export const DEFAULT_REVIEW_COUNT = 3;

export const STARS_COUNT = 5;

export enum ProductTab {
  Description = 'description',
  Characteristics = 'characteristics',
}

export enum Sorting {
  Type = 'sort-type',
  Direction = 'sort-direction',
}

export enum SortType {
  Price = 'price',
  Popular = 'popular',
}

export enum SortDirection {
  Down = 'down',
  Up = 'up',
}

export const PRODUCTS_PER_PAGE = 9;
