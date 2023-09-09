import { dataSource } from '..';
import { packs } from './packs';
import { products } from './products';

const create = async () => {
  const connection = await dataSource.initialize();
  try {
    await connection.query('BEGIN');
    await products(connection);
    await packs(connection);
    await connection.query('COMMIT');
    console.log('Initialization of default data successfully done!');
  } catch (err) {
    console.error(
      'Error during initialization of default data, rolling back:',
      err,
    );
    await connection.query('ROLLBACK');
  } finally {
    await connection.destroy();
  }
};
create();
