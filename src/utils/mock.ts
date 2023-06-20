import { TProduct } from '../types/product';
import * as faker from 'faker';
import { TReview } from '../types/review';
import { TPromo } from '../types/promo';

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
});

export const createFakeReview = (): TReview => ({
  id: faker.lorem.word(),
  createAt: faker.lorem.word(),
  cameraId: faker.datatype.number(),
  userName: faker.lorem.word(),
  advantage: faker.lorem.word(),
  disadvantage: faker.lorem.word(),
  review: faker.lorem.word(),
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
