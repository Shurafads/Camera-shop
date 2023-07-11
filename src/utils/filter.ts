import { Category, CategoryName, ProductName, SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { sortProductsList } from './sort';

const filterByPrice = (productsList: TProduct[] , maxPrice: number, minPrice: number) => {

  if (!maxPrice && !minPrice) {
    return productsList;
  }
  if (!maxPrice) {
    return productsList.filter((product) => product.price >= minPrice);
  }
  return productsList.filter((product) => product.price >= minPrice && product.price <= maxPrice);

};

const filterByCategory = (productsList: TProduct[] , category: Category | null) => {

  if (!category) {
    return productsList;
  }
  return productsList.filter((product) => product.category === CategoryName[category]);

};

const filterByCameraType = (productsList: TProduct[], cameraType: string[]) => {
  if (cameraType.length < 1) {
    return productsList;
  }
  return productsList.filter((product) => Object.values(cameraType).includes(ProductName[product.type]));
};

export const filterProductsList = (
  productsList: TProduct[],
  sortType: SortType | null,
  direction: SortDirection| null,
  minPrice: number,
  maxPrice: number,
  category: Category | null,
  productType: string[]) => {

  const sortedProductsList = sortProductsList(productsList, sortType, direction);

  const filteredByCategory = filterByCategory(sortedProductsList, category);
  const filteredByCameraType = filterByCameraType(filteredByCategory, productType);
  const filteredByPrice = filterByPrice(filteredByCameraType, maxPrice, minPrice);

  return filteredByPrice;
};

