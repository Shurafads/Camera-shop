import { Category, Level, SortDirection, SortType, Type } from '../../const';
import { changeCategory, changeCurrentPage, changeLevel, changeMaxPrice, changeMinPrice, changeSortDirection, changeSortType, changeType, initialState, resetFilter, searchData } from './search-data';

describe('Reducer: searchData', () => {

  it('without additional parameters should return initial state', () => {
    expect(searchData.reducer(undefined , {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  it('should update Page after getting the page', () => {
    expect(searchData.reducer(initialState, changeCurrentPage(5)))
      .toEqual({
        ...initialState,
        page: 5
      });
  });

  it('should update SortType and SortDirection after getting the type', () => {
    expect(searchData.reducer(initialState, changeSortType(SortType.Price)))
      .toEqual({
        ...initialState,
        sortType: SortType.Price,
        sortDirection: SortDirection.Up
      });
  });

  it('should update SortDirection and SortType after getting the direction', () => {
    expect(searchData.reducer(initialState, changeSortDirection(SortDirection.Down)))
      .toEqual({
        ...initialState,
        sortType: SortType.Price,
        sortDirection: SortDirection.Down
      });
  });

  it('should update MinPrice after getting the price', () => {
    expect(searchData.reducer(initialState, changeMinPrice(500)))
      .toEqual({
        ...initialState,
        minPrice: 500
      });
  });

  it('should update MaxPrice after getting the price', () => {
    expect(searchData.reducer(initialState, changeMaxPrice(500)))
      .toEqual({
        ...initialState,
        maxPrice: 500
      });
  });

  it('should update Category after getting the category', () => {
    expect(searchData.reducer(initialState, changeCategory(Category.Photocamera)))
      .toEqual({
        ...initialState,
        category: Category.Photocamera
      });
  });

  it('should update Type after getting the type', () => {
    expect(searchData.reducer(initialState, changeType([Type.Digital])))
      .toEqual({
        ...initialState,
        filterType: [Type.Digital]
      });
  });

  it('should update Level after getting the level', () => {
    expect(searchData.reducer(initialState, changeLevel([Level.Amateur])))
      .toEqual({
        ...initialState,
        level: [Level.Amateur]
      });
  });

  it('should update filters after initial resetFilter', () => {
    expect(searchData.reducer(initialState, resetFilter()))
      .toEqual({
        ...initialState,
        minPrice: 0,
        maxPrice: 0,
        category: null,
        filterType: [],
        level: [],
      });
  });
});
