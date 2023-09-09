import { IProduct } from '../entities/IProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  findByCode(code: number): Promise<IProduct>;
  findByCodes(codes: number[]): Promise<IProduct[]>;
  save(client: IProduct): Promise<IProduct>;
}
