import productsRouter from '@modules/products/infra/http/routes/products.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

export { routes };
