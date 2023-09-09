import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePacksTable1693951457418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE packs(
        id bigint AUTO_INCREMENT PRIMARY KEY,
        pack_id bigint NOT NULL,
        product_id bigint NOT NULL,
        qty bigint NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      ALTER TABLE
        packs
      ADD CONSTRAINT
        FK_PACKS_PACK_ID
      FOREIGN KEY
        (pack_id)
      REFERENCES
        products(code)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE
        packs
      ADD CONSTRAINT
        FK_PACKS_PRODUCT_ID
      FOREIGN KEY
        (product_id)
      REFERENCES
        products(code)
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE packs DROP CONSTRAINT FK_PACKS_PRODUCT_ID;
    `);
    await queryRunner.query(`
      ALTER TABLE packs DROP CONSTRAINT FK_PACKS_PACK_ID;
    `);
    await queryRunner.query(`DROP TABLE packs`);
  }
}
