import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { Readable } from 'stream';
import csv from 'csv-parser';
import { ADJUSTMENT_PERCENTAGE_PRICE } from 'src/constants/adjustmentPercentagePrice';
import { AppError } from '@shared/errors/AppError';
import { findDuplicates } from '@utils/findDuplicates';

export interface INewProducts {
  row: number;
  code: number;
  name: string;
  currentPrice: number;
  newPrice: number;
  error: string[];
}

export interface IResponse {
  productsResponse: INewProducts[];
  hasError: boolean;
}

@injectable()
export class ValidateProductCSVUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  async execute(file: Express.Multer.File): Promise<IResponse> {
    if (!file) {
      throw new AppError('Arquivo obrigatório');
    }
    if (file.mimetype !== 'text/csv') {
      throw new AppError('Arquivo deve ser um CSV');
    }
    const { buffer } = file;
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const transformToObject = csv({ separator: ',' });

    const productsResponse: INewProducts[] = [];
    let row = 1;
    let hasError = false;
    await readableFile
      .pipe(transformToObject)
      .on('data', async data => {
        row++;
        const code = data.product_code ? parseInt(data.product_code) : 0;
        let newPrice = data.new_price ? Number(data.new_price) : 0;
        newPrice = newPrice ? Number(newPrice.toFixed(2)) : newPrice;
        const error: string[] = [];
        if (!data.product_code) {
          error.push('Código do produto não informado');
          hasError = true;
        }
        if (!data.new_price) {
          error.push('Novo preço do produto não informado');
          hasError = true;
        }
        if (data.new_price && !newPrice) {
          error.push('Novo preço do produto inválido');
          hasError = true;
        }
        const name = '';
        const currentPrice = 0;
        productsResponse.push({
          row,
          code,
          name,
          currentPrice,
          newPrice,
          error,
        });
      })
      .on('error', () => {
        throw new AppError('Error ao ler o arquivo');
      });

    let productsCodes = productsResponse.map(product => product.code);
    const productsCodesDuplicate = findDuplicates<number>(productsCodes);
    productsCodes = [...new Set(productsCodes)];
    const productsCurrent = await this.productsRepository.findByCodes(
      productsCodes,
    );
    productsResponse.forEach((product, ind) => {
      const productCurrent = productsCurrent.filter(
        productCurrent => productCurrent.code === product.code,
      )[0];
      if (productCurrent && productsCodesDuplicate.indexOf(product.code) >= 0) {
        productsResponse[ind].error.push(
          'Código do produto duplicado no arquivo',
        );
        hasError = true;
      }
      if (!productCurrent) {
        productsResponse[ind].error.push(
          'Código do produto não encontrado/inválido',
        );
        hasError = true;
      }
      if (productCurrent) {
        const currentPrice = Number(productCurrent.salesPrice);
        productsResponse[ind].name = productCurrent.name;
        productsResponse[ind].currentPrice = currentPrice;

        if (product.newPrice) {
          if (product.newPrice < productCurrent.costPrice) {
            productsResponse[ind].error.push(
              'Novo preço não pode ser menor que o custo de fabricação',
            );
            hasError = true;
          }
          const differencePriceForChange =
            currentPrice * ADJUSTMENT_PERCENTAGE_PRICE;
          if (product.newPrice > currentPrice + differencePriceForChange) {
            productsResponse[ind].error.push(
              `Novo preço não pode ser maior que ${
                ADJUSTMENT_PERCENTAGE_PRICE * 100
              }% do valor atual`,
            );
            hasError = true;
          }
          if (product.newPrice < currentPrice - differencePriceForChange) {
            productsResponse[ind].error.push(
              `Novo preço não pode ser menor que ${
                ADJUSTMENT_PERCENTAGE_PRICE * 100
              }% do valor atual`,
            );
            hasError = true;
          }

          if (productCurrent.packs.length) {
            const productsOfThePack = productCurrent.packs.map(pack => {
              return { code: pack.productId.code, qty: pack.qty, newPrice: 0 };
            });
            let allProductsPackExist = true;
            let packHasDuplicateProductInFile = false;
            productsOfThePack.forEach((productOfThePack, i) => {
              const newProductsResponse = productsResponse.filter(
                product => product.code === productOfThePack.code,
              );
              if (newProductsResponse.length > 1) {
                productsResponse[ind].error.push(
                  `No arquivo o produto com o código ${productOfThePack.code} está duplicado`,
                );
                hasError = true;
                packHasDuplicateProductInFile = true;
              }
              const newProductResponse = newProductsResponse[0];
              if (!newProductResponse) {
                productsResponse[ind].error.push(
                  'Caso for atualizar um pack de produtos os produtos deve ter seu preço atualizados',
                );
                hasError = true;
                allProductsPackExist = false;
              } else {
                productsOfThePack[i].newPrice = newProductResponse.newPrice;
              }
            });
            if (allProductsPackExist && !packHasDuplicateProductInFile) {
              let sumNewPricesProduct = productsOfThePack.reduce(
                (ac, productOfThePack) => {
                  return ac + productOfThePack.newPrice * productOfThePack.qty;
                },
                0,
              );
              sumNewPricesProduct = Number(sumNewPricesProduct.toFixed(2));
              if (sumNewPricesProduct !== product.newPrice) {
                productsResponse[ind].error.push(
                  'A soma do preço x quantidade de produtos deve ter o mesmo valor do pack',
                );
                hasError = true;
              }
            }
          }

          if (productCurrent.productsPacks.length) {
            const packsOfTheProduct = productCurrent.productsPacks.map(
              product => {
                return {
                  code: product.packId.code,
                };
              },
            );
            packsOfTheProduct.forEach(packOfTheProduct => {
              if (productsCodes.indexOf(packOfTheProduct.code) < 0) {
                productsResponse[ind].error.push(
                  'Caso for atualizar um produto que está em um pack, o pack com o novo preço deve ser atualizado',
                );
                hasError = true;
              }
            });
          }
        }
      }
    });
    return { productsResponse, hasError };
  }
}
