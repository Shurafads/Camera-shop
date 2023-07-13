import { Category, SortDirection, SortType } from '../../const';
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
        Page: 5}
      );
  });

  it('should update SortType and SortDirection after getting the type', () => {
    expect(searchData.reducer(initialState, changeSortType(SortType.Price)))
      .toEqual({
        ...initialState,
        SortType: SortType.Price,
        SortDirection: SortDirection.Up}
      );
  });

  it('should update SortDirection and SortType after getting the direction', () => {
    expect(searchData.reducer(initialState, changeSortDirection(SortDirection.Down)))
      .toEqual({
        ...initialState,
        SortType: SortType.Price,
        SortDirection: SortDirection.Down}
      );
  });

  it('should update MinPrice after getting the price', () => {
    expect(searchData.reducer(initialState, changeMinPrice(500)))
      .toEqual({
        ...initialState,
        MinPrice: 500}
      );
  });

  it('should update MaxPrice after getting the price', () => {
    expect(searchData.reducer(initialState, changeMaxPrice(500)))
      .toEqual({
        ...initialState,
        MaxPrice: 500}
      );
  });

  it('should update Category after getting the category', () => {
    expect(searchData.reducer(initialState, changeCategory(Category.Photocamera)))
      .toEqual({
        ...initialState,
        Category: Category.Photocamera}
      );
  });

  it('should update Type after getting the type', () => {
    expect(searchData.reducer(initialState, changeType(['digital'])))
      .toEqual({
        ...initialState,
        FilterType: ['digital']}
      );
  });

  it('should update Level after getting the level', () => {
    expect(searchData.reducer(initialState, changeLevel(['amateur'])))
      .toEqual({
        ...initialState,
        Level: ['amateur']}
      );
  });

  it('should update filters after initial resetFilter', () => {
    expect(searchData.reducer(initialState, resetFilter()))
      .toEqual({
        ...initialState,
        MinPrice: 0,
        MaxPrice: 0,
        Category: null,
        FilterType: [],
        Level: [],
      });
  });
});
