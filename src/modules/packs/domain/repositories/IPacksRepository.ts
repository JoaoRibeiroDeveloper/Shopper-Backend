import { IPack } from '../entities/IPack';

export interface IPacksRepository {
  findById(id: number): Promise<IPack | null>;
}
