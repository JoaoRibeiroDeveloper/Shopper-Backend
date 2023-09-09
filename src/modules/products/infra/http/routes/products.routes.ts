import { Router } from 'express';
import { container } from 'tsyringe';

import multer from 'multer';
import { ValidateProductCSVController } from '@modules/products/useCases/validateProductCSV/ValidateProductCSVController';
import { UpdatePriceProductCSVController } from '@modules/products/useCases/updatePriceProductCSV/UpdatePriceProductCSVController';

const productsRouter = Router();
const multerConfig = multer();

const validateProductCSVController = container.resolve(
  ValidateProductCSVController,
);
const updatePriceProductCSVController = container.resolve(
  UpdatePriceProductCSVController,
);

productsRouter.post(
  '/validateCSV',
  multerConfig.single('file'),
  validateProductCSVController.handle,
);

productsRouter.patch(
  '/updatePriceCSV',
  multerConfig.single('file'),
  updatePriceProductCSVController.handle,
);

export default productsRouter;
