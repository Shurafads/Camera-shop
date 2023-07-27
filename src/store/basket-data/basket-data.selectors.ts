import { NameSpace } from '../../const';
import { TProduct } from '../../types/product';
import { State } from '../../types/state';

export const getBasketList = (state: State): TProduct[] => state[NameSpace.Basket].BasketList;
