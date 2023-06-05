import { NameSpace } from '../../const';
import { TReview } from '../../types/review';
import { State } from '../../types/state';

export const getReviewsList = (state: State): TReview[] => state[NameSpace.Review].ReviewsList;
