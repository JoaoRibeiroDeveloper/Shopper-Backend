import { DataSource } from 'typeorm';

export const packs = async (connection: DataSource) => {
  await connection.query(
    `INSERT INTO packs (pack_id,product_id, qty) VALUES
      (1000,18,6),
      (1010,24,1),
      (1010,26,1),
      (1020,19,3),
      (1020,21,3);`,
  );
};
