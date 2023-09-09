import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ValidateProductCSVUseCase } from './ValidateProductCSVUseCase';

export class ValidateProductCSVController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const validateProductCSVUseCase = container.resolve(
      ValidateProductCSVUseCase,
    );
    const productsResponse = await validateProductCSVUseCase.execute(file);
    return response.json(productsResponse);
  }
}
