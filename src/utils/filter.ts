import { Category, CategoryName, ProductTypeName, ProductLevelName, SortDirection, SortType } from '../const';
import { TProduct } from '../types/product';
import { sortPriceToHigh, sortProductsList } from './sort';

export const getPrice = (productList: TProduct[], type: 'max' | 'min'): string => {
  if (!productList.length) {
    return '';
  }

  const sortedProductList = [...productList].sort(sortPriceToHigh);

  if (type === 'max' && sortedProductList.length) {
    return sortedProductList[sortedProductList.length - 1].price.toString();
  } else {
    return sortedProductList[0].price.toString();
  }
};

const filterByCategory = (productsList: TProduct[] , category: Category | null) => {

  if(!productsList.length) {
    return productsList;
  }

  if (!category) {
    return productsList;
  }
  return productsList.filter((product) => product.category === CategoryName[category]);
};

const filterByProductType = (productsList: TProduct[], cameraType: string[]) => {

  if(!productsList.length) {
    return productsList;
  }

  if (!cameraType.length) {
    return productsList;
  }
  return productsList.filter((product) => Object.values(cameraType).includes(ProductTypeName[product.type]));
};

const filterByProductLevel = (productsList: TProduct[], level: string[]) => {

  if(!productsList.length) {
    return productsList;
  }

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

