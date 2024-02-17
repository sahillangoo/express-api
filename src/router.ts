// Import the Router function from the express module
import { Router } from 'express';
import { handleInputErrors } from './modules/middleware';
import { oneOf } from 'express-validator';
// Import the body and validationResult functions from the express-validator module
const { body, validationResult } = require('express-validator');

// Create a new router
const router = Router();

// Define routes for products
router.get('/product', (req, res) => {
	// Send a JSON response with a message
	res.json({ message: 'product' });
});

// Define a route to get a product by its ID
router.get('/product/:id', () => {});

// Define a route to update a product by its ID
// The body('name').isString() middleware validates that the name is a string
router.put(
	'/product/:id',
	body('name').isString(),
	handleInputErrors,
	(req, res) => {}
);

// Define a route to create a new product
router.post('/product', () => {});

// Define a route to delete a product by its ID
router.delete('/product/:id', () => {});

// Define routes for updates
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional()
);
router.post(
	'/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
	body('productId').exists().isString()
);
router.delete('/update/:id', () => {});

// Define routes for update points
router.get('/updatepoints', () => {});
router.get('/updatepoints/:id', () => {});
router.put('/updatepoints/:id', () => {});
router.post('/updatepoints', () => {});
router.delete('/updatepoints/:id', () => {});

// Export the router
export default router;
