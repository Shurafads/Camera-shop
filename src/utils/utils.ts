import { TReview } from '../types/review';

export const SortDate = (a: TReview, b: TReview) => {
  if (a.createAt > b.createAt) {
    return -1;
  }
  if (a.createAt < b.createAt) {
    return 1;
  }
  return 0;
};

export const WindowScrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});
