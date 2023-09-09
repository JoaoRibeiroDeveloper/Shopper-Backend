import { container } from 'tsyringe';

import { PacksRepository } from '../infra/typeorm/repositories/PacksRepository';
import { IPacksRepository } from '../domain/repositories/IPacksRepository';

container.registerSingleton<IPacksRepository>(
  'PacksRepository',
  PacksRepository,
);
