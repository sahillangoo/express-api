import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  getOneUpdate,
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from './handlers/update';
import { handleInputErrors } from './modules/middleware';

// Create routers for each group of routes
const productRouter = Router();
const updateRouter = Router();
const updatePointsRouter = Router();

// Define routes for products
productRouter.get('/', getProducts);
productRouter.get('/:id', param('id').isUUID(), handleInputErrors, getOneProduct);
productRouter.put('/:id', body('name').isString(), handleInputErrors, updateProduct);
productRouter.post('/', body('name').isString(), handleInputErrors, createProduct);
productRouter.delete('/:id', param('id').isUUID(), handleInputErrors, deleteProduct);

// Define routes for updates
updateRouter.get('/', getUpdates);
updateRouter.get('/:id', param('id').isUUID(), handleInputErrors, getOneUpdate);
updateRouter.put(
  '/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
);
updateRouter.post(
  '/',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
updateRouter.delete('/:id', param('id').isUUID(), handleInputErrors, deleteUpdate);

// Define routes for update points
updatePointsRouter.get('/', () => {});
updatePointsRouter.get('/:id', () => {});
updatePointsRouter.put(
  '/:id',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
);
updatePointsRouter.post('/', () => {});
updatePointsRouter.delete('/:id', () => {});

// Use the routers
const router: Router = Router();
router.use('/product', productRouter);
router.use('/update', updateRouter);
router.use('/updatepoints', updatePointsRouter);

// Export the router
export default router;
