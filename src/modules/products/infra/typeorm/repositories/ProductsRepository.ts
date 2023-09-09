import { IProduct } from '@modules/products/domain/entities/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<IProduct>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async findByName(name: string): Promise<IProduct | null> {
    return this.repository.findOneBy({ name });
  }
  async findByCode(code: number): Promise<IProduct> {
    return this.repository.findOneBy({ code });
  }
  async findByCodes(codes: number[]): Promise<IProduct[]> {
    return this.repository.find({
      relations: {
        packs: {
          productId: true,
        },
        productsPacks: {
          packId: true,
        },
      },
      where: {
        code: In(codes),
      },
    });
  }
  async save(client: IProduct): Promise<IProduct> {
    return this.repository.save(client);
  }
}
