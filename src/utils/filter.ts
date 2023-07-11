import { Category, CategoryName, SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { sortProductsList } from './sort';

const filterProductsListByPrice = (productsList: TProduct[] , maxPrice: number, minPrice: number) => {

  if (!maxPrice && !minPrice) {
    return productsList;
  }
  if (!maxPrice) {
    return productsList.filter((product) => product.price >= minPrice);
  }
  return productsList.filter((product) => product.price >= minPrice && product.price <= maxPrice);

};

const filterProductsListByCategory = (productsList: TProduct[] , category: Category | null) => {

  if (!category) {
    return productsList;
  }
  return productsList.filter((product) => product.category === CategoryName[category]);

};

export const filterProductsList = (
  productsList: TProduct[],
  type: SortType | null,
  direction: SortDirection| null,
  minPrice: number,
  maxPrice: number,
  category: Category | null) => {

  const sortedProductsList = sortProductsList(productsList, type, direction);

  const filteredByCategory = filterProductsListByCategory(sortedProductsList, category);
  const filteredByPrice = filterProductsListByPrice(filteredByCategory, maxPrice, minPrice);

  return filteredByPrice;
};

