export const URL = 'https://camera-shop.accelerator.pages.academy/';

export const PRODUCTS_PER_PAGE = 9;

export const DEFAULT_REVIEW_COUNT = 3;

export const STARS_COUNT = 5;

export const MIN_PRODUCT_COUNT = 1;

export const MAX_PRODUCT_COUNT = 99;

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
  Search = 'SEARCH',
  Basket = 'BASKET',
}

export enum ApiRoute {
  Cameras = '/cameras',
  Promo = '/promo',
}

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

export enum Category {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

export enum CategoryName {
  photocamera = 'Фотоаппарат',
  videocamera = 'Видеокамера',
}

export enum Type {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export enum Level {
  Zero = 'zero',
  Amateur = 'amateur',
  Professional = 'professional',
}

export const ProductTypeName: {[key: string]: string} = {
  Цифровая: 'digital',
  Плёночная: 'film',
  Моментальная: 'snapshot',
  Коллекционная: 'collection',
} as const;

export const ProductLevelName: {[key: string]: string} = {
  Нулевой: 'zero',
  Любительский: 'amateur',
  Профессиональный: 'professional',
} as const;
