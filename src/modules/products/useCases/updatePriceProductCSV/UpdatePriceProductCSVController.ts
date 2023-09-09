import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePriceProductCSVUseCase } from './UpdatePriceProductCSVUseCase';

export class UpdatePriceProductCSVController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const updatePriceProductCSVUseCase = container.resolve(
      UpdatePriceProductCSVUseCase,
    );
    await updatePriceProductCSVUseCase.execute(file);
    return response.json({});
  }
}
