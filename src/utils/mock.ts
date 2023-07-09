import { TProduct } from '../types/product';
import * as faker from 'faker';
import { TReview, TUserReview } from '../types/review';
import { TPromo } from '../types/promo';
import { NameSpace } from '../const';
import { State } from '../types/state';

export const createFakeProduct = (): TProduct => ({
  type: faker.lorem.word(),
  name: faker.lorem.word(),
  category: faker.lorem.word(),
  vendorCode: faker.lorem.word(),
  previewImg2x: faker.lorem.word(),
  previewImg: faker.lorem.word(),
  previewImgWebp2x: faker.lorem.word(),
  previewImgWebp: faker.lorem.word(),
  level: faker.lorem.word(),
  description: faker.lorem.word(),
  price: faker.datatype.number(),
  id: faker.datatype.number(),
  reviewCount: faker.datatype.number(),
  rating: faker.datatype.number(),
});

export const createFakeProductInfo = (): TProduct => ({
  type: faker.lorem.word(),
  name: faker.lorem.word(),
  category: faker.lorem.word(),
  vendorCode: faker.lorem.word(),
  previewImg2x: faker.lorem.word(),
  previewImg: faker.lorem.word(),
  previewImgWebp2x: faker.lorem.word(),
  previewImgWebp: faker.lorem.word(),
  level: faker.lorem.word(),
  description: faker.lorem.word(),
  price: faker.datatype.number(),
  id: faker.datatype.number({min: 1}),
  reviewCount: faker.datatype.number(),
  rating: faker.datatype.number(),
});

export const createFakePromo = (): TPromo => ({
  id: faker.datatype.number(),
  name: faker.lorem.word(),
  previewImg: faker.lorem.word(),
  previewImg2x: faker.lorem.word(),
  previewImgWebp: faker.lorem.word(),
  previewImgWebp2x: faker.lorem.word(),
});

export const createFakeUserInfo = (): TUserReview => ({
  cameraId: faker.datatype.number(),
  userName: faker.lorem.word(),
  advantage: faker.lorem.word(),
  disadvantage: faker.lorem.word(),
  review: faker.lorem.word(),
  rating: faker.datatype.number({min: 1, max: 5}),
  reset: jest.fn,
  onSubmitModal: jest.fn,
});

export const createFakeReview = (): TReview => ({
  id: faker.lorem.word(),
  createAt: faker.lorem.word(),
  cameraId: faker.datatype.number(),
  userName: faker.lorem.word(),
  advantage: faker.lorem.word(),
  disadvantage: faker.lorem.word(),
  review: faker.lorem.word(),
  rating: faker.datatype.number({min: 1, max: 5}),
});

export const fakeStore = (): State => ({
  [NameSpace.Product]: {
    ProductsList: [createFakeProduct()],
    CopyProductsList: [createFakeProduct()],
    ProductsOnPage: [createFakeProduct()],
    ProductInfo: createFakeProductInfo(),
    SimilarProductsList: [createFakeProduct()],
    isLoadingProductsList: false,
    isLoadingProducInfo: false,
    isLoadingSimilarProducts: false,
  },
  [NameSpace.Review]: {
    ReviewsList: [createFakeReview()],
  },
  [NameSpace.Promo]: {
    Promo: createFakePromo(),
  },
});
