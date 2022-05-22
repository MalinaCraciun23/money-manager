import express, { Request, Response, NextFunction } from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

import accountRoutes from './routes/accountRoutes';
import categoryRoutes from './routes/categoryRoutes';
import transactionRoutes from './routes/transactionRoutes';

import accountService from './services/accountService';
import categoryService from './services/categoryService';
import transactionService from './services/transactionService';

interface Error {
  status?: number;
  message?: string;
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/account', accountRoutes);
app.use('/category', categoryRoutes);
app.use('/transaction', transactionRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

console.log('Initializing server...');
accountService.init();
categoryService.init();
transactionService.init();
app.listen(5000, () => {
  console.log('Server started!');
});
