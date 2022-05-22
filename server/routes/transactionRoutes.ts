import { Router, Request, Response } from 'express';
import * as yup from 'yup';
import { expressYupMiddleware } from 'express-yup-middleware';
import transactionService from '../services/transactionService';

const transactionRouter = Router();

const addSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        type: yup.string().required().oneOf(['expense', 'income']),
        account: yup.string().required(),
        category: yup.string().required(),
        amount: yup.number().required().positive('Amount must be positive'),
      }),
    },
  },
};
transactionRouter.post(
  '/',
  expressYupMiddleware({ schemaValidator: addSchema }),
  (req: Request, res: Response) => {
    const transaction = transactionService.addTransaction(
      req.body.type,
      req.body.account,
      req.body.category,
      req.body.amount
    );
    res.status(200).json(transaction);
  }
);

transactionRouter.get('/', (req: Request, res: Response) => {
  const transactions = transactionService.getTransactions();
  res.status(200).json(transactions);
});

export default transactionRouter;
