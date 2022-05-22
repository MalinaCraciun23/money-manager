import { Router, Request, Response } from 'express';
import * as yup from 'yup';
import { expressYupMiddleware } from 'express-yup-middleware';
import accountService from '../services/accountService';

const accountRouter = Router();

const addSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required().min(2, 'Name too short').max(100),
        amount: yup.number().required().positive('Amount must be positive'),
      }),
    },
  },
};
accountRouter.post(
  '/',
  expressYupMiddleware({ schemaValidator: addSchema }),
  (req: Request, res: Response) => {
    const account = accountService.addAccount(req.body.name, req.body.amount);
    res.status(200).json(account);
  }
);

accountRouter.get('/', (req: Request, res: Response) => {
  const accounts = accountService.getAccounts();
  res.status(200).json(accounts);
});

const deleteSchema = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.string().required(),
      }),
    },
  },
};
accountRouter.delete(
  '/:id',
  expressYupMiddleware({ schemaValidator: deleteSchema }),
  (req: Request, res: Response) => {
    const account = accountService.deleteAccount(req.params.id);
    res.status(200).json(account);
  }
);

const updateSchema = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.string().required(),
      }),
    },
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required().min(2, 'Name too short').max(100),
        amount: yup.number().required().positive('Amount must be positive'),
      }),
    },
  },
};
accountRouter.put(
  '/:id',
  expressYupMiddleware({ schemaValidator: updateSchema }),
  (req: Request, res: Response) => {
    const account = accountService.updateAccount(
      req.params.id,
      req.body.name,
      req.body.amount
    );

    res.status(200).json(account);
  }
);

export default accountRouter;
