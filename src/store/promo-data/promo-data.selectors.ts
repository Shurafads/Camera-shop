import { NameSpace } from '../../const';
import { TPromo } from '../../types/promo';
import { State } from '../../types/state';

export const getPromo = (state: State): TPromo | null => state[NameSpace.Promo].Promo;
