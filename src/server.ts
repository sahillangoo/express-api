// Import necessary modules
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

// Create an express application
const app = express();

// Use cors middleware to enable Cross Origin Resource Sharing
app.use(cors());

// Use morgan middleware for logging HTTP requests
app.use(morgan('dev')); // dev | combined | common | short | tiny

// Use express.json middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Use express.urlencoded middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Define a GET route for the root path
app.get('/', (req, res, next) => {
	res.status(200);
	res.json({ mes: 'World!' });
	console.log('hello console');
	next();
});

// Use the protect middleware and router for all routes starting with /api
app.use('/api', protect, router);

// Define a POST route for creating new users
app.post('/user', createNewUser);

// Define a POST route for signing in users
app.post('/signin', signin);

// Error handling middleware
app.use((err, req, res, next) => {
	console.log(err);
	res.json({ message: `had an error: ${err.message}` });
});

// Export the express application
export default app;
