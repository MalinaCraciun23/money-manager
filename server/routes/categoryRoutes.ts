import { Router, Request, Response } from 'express';
import * as yup from 'yup';
import { expressYupMiddleware } from 'express-yup-middleware';
import categoryService from '../services/categoryService';

const categoryRouter = Router();

const addSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required().min(2, 'Name too short').max(100),
        type: yup.string().required().oneOf(['expense', 'income']),
      }),
    },
  },
};
categoryRouter.post(
  '/',
  expressYupMiddleware({ schemaValidator: addSchema }),
  (req: Request, res: Response) => {
    const category = categoryService.addCategory(req.body.name, req.body.type);
    res.status(200).json(category);
  }
);

categoryRouter.get('/', (req: Request, res: Response) => {
  const categories = categoryService.getCategories();
  res.status(200).json(categories);
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
categoryRouter.delete(
  '/:id',
  expressYupMiddleware({ schemaValidator: deleteSchema }),
  (req: Request, res: Response) => {
    const category = categoryService.deleteCategory(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
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
        type: yup.string().required().oneOf(['expense', 'income']),
      }),
    },
  },
};
categoryRouter.put(
  '/:id',
  expressYupMiddleware({ schemaValidator: updateSchema }),
  (req: Request, res: Response) => {
    const category = categoryService.updateCategory(
      req.params.id,
      req.body.name,
      req.body.type
    );

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  }
);

export default categoryRouter;
