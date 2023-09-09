import { IPack } from '@modules/packs/domain/entities/IPack';

export interface IProduct {
  code: number;
  name: string;
  costPrice: number;
  salesPrice: number;
  createdAt: Date;
  updatedAt: Date;
  packs: IPack[];
  productsPacks: IPack[];
}
