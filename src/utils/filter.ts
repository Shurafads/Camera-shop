import { Category, CategoryName, ProductTypeName, ProductLevelName, SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { sortProductsList } from './sort';

const filterByCategory = (productsList: TProduct[] , category: Category | null) => {

  if (!category) {
    return productsList;
  }
  return productsList.filter((product) => product.category === CategoryName[category]);
};

const filterByProductType = (productsList: TProduct[], cameraType: string[]) => {

  if (!cameraType.length) {
    return productsList;
  }
  return productsList.filter((product) => Object.values(cameraType).includes(ProductTypeName[product.type]));
};

const filterByProductLevel = (productsList: TProduct[], level: string[]) => {

  if (!level.length) {
    return productsList;
  }
  return productsList.filter((product) => Object.values(level).includes(ProductLevelName[product.level]));
};

const filterByPrice = (productsList: TProduct[] , maxPrice: number, minPrice: number) => {

  if (!maxPrice && !minPrice) {
    return productsList;
  }
  if (!maxPrice) {
    return productsList.filter((product) => product.price >= minPrice);
  }
  return productsList.filter((product) => product.price >= minPrice && product.price <= maxPrice);
};

export const filterProductsList = (
  productsList: TProduct[],
  sortType: SortType | null,
  direction: SortDirection| null,
  minPrice: number,
  maxPrice: number,
  category: Category | null,
  filterType: string[],
  level: string[]) => {

  const sortedProductsList = sortProductsList(productsList, sortType, direction);

  const filteredByCategory = filterByCategory(sortedProductsList, category);
  const filteredByProductType = filterByProductType(filteredByCategory, filterType);
  const filteredByProductLevel = filterByProductLevel(filteredByProductType, level);
  const filteredByPrice = filterByPrice(filteredByProductLevel, maxPrice, minPrice);

  return filteredByPrice;
};

