import { container, inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { ValidateProductCSVUseCase } from '../validateProductCSV/ValidateProductCSVUseCase';

@injectable()
export class UpdatePriceProductCSVUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async execute(file: Express.Multer.File): Promise<void> {
    const validateProductCSVUseCase = container.resolve(
      ValidateProductCSVUseCase,
    );
    const { hasError, productsResponse } =
      await validateProductCSVUseCase.execute(file);
    if (hasError) {
      throw new AppError(
        'Arquivo com dados inválidos para mais detalhes passe pela validação',
      );
    }

    const productsCodes = productsResponse.map(product => product.code);
    const productsCurrent = await this.productsRepository.findByCodes(
      productsCodes,
    );

    productsCurrent.forEach(async productCurrent => {
      const productResponse = productsResponse.filter(
        productResponse => productCurrent.code === productResponse.code,
      )[0];
      productCurrent.salesPrice = productResponse.newPrice;
      await this.productsRepository.save(productCurrent);
    });
  }
}
