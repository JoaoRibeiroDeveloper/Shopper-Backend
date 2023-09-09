import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { IPacksRepository } from '@modules/packs/domain/repositories/IPacksRepository';
import { IPack } from '@modules/packs/domain/entities/IPack';
import { Pack } from '../entities/Pack';

export class PacksRepository implements IPacksRepository {
  private repository: Repository<IPack>;

  constructor() {
    this.repository = dataSource.getRepository(Pack);
  }

  async findById(id: number): Promise<IPack> {
    return this.repository.findOneBy({ id });
  }
}
