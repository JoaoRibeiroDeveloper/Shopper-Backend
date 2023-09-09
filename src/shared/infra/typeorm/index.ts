import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { CreateProductsTable1693951444028 } from './migrations/1693951444028-CreateProductsTable';
import { CreatePacksTable1693951457418 } from './migrations/1693951457418-CreatePacksTable';

import { Pack } from '@modules/packs/infra/typeorm/entities/Pack';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

const port = process.env.DB_PORT as unknown as number;

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Pack, Product],
  migrations: [CreateProductsTable1693951444028, CreatePacksTable1693951457418],
});
