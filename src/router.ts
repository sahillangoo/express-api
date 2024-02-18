import { Router } from 'express';
import { body } from 'express-validator';
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

// Create a new router
const router = Router();

// Define routes for products
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

// Define routes for updates
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

// Define routes for update points
router.get('/updatepoints', () => {});
router.get('/updatepoints/:id', () => {});
router.put(
  '/updatepoints/:id',
  body('name').isString(),
  body('discription').isString(),
  body('updateId').exists().isString(),

  () => {}
);
router.post('/updatepoints', () => {});
router.delete('/updatepoints/:id', () => {});

// Export the router
export default router;
