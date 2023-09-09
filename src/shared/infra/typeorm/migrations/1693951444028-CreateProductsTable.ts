import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1693951444028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE products(
        code bigint PRIMARY KEY,
        name varchar(100) NOT NULL,
        cost_price decimal(9,2) NOT NULL,
        sales_price decimal(9,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE products`);
  }
}
