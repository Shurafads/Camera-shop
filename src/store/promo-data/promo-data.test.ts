import { createFakePromo } from '../../utils/mock';
import { fetchPromoAction } from '../api-action';
import { initialState, promoData } from './promo-data';

const promo = createFakePromo();

describe('Reducer: promoData', () => {

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(undefined , {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState});
  });

  it('should update promo by load promo', () => {
    expect(promoData.reducer(initialState, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({promo});
  });
});
