import { Sorting } from '../const';

export type TQueryParam = {
  page?: string;
  [Sorting.Type]?: string;
  [Sorting.Direction]?: string;
  price_min?: string;
  price_max?: string;
  category?: string;
}
