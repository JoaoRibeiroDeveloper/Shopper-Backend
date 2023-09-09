import { IProduct } from '@modules/products/domain/entities/IProduct';

export interface IPack {
  id: number;
  packId: IProduct;
  productId: IProduct;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
}
