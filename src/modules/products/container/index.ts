import { container } from 'tsyringe';

import { ValidateProductCSVController } from '../useCases/validateProductCSV/ValidateProductCSVController';
import { UpdatePriceProductCSVController } from '../useCases/updatePriceProductCSV/UpdatePriceProductCSVController';

import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

container.registerSingleton(
  'ValidateProductCSVController',
  ValidateProductCSVController,
);
container.registerSingleton(
  'UpdatePriceProductCSVController',
  UpdatePriceProductCSVController,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
