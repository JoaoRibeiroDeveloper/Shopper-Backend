import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorMessage = err.details.get('body').message;

    return res.status(400).json({
      status: 'error',
      message: errorMessage,
    });
  }
  next(err);
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export { app };
