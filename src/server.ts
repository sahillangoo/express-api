import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

// Use CORS middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Use Helmet middleware to secure Express apps by setting various HTTP headers
app.use(
  helmet({
    // Set Content Security Policy for preventing XSS and data injection attacks
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Default policy for loading content such as JavaScript, Images, CSS, Font's, AJAX requests etc.
        scriptSrc: ["'self'", "'unsafe-inline'"], // Defines valid sources of JavaScript
        styleSrc: ["'self'", "'unsafe-inline'"], // Defines valid sources of stylesheets
        imgSrc: ["'self'", 'data:'], // Defines valid sources of images
        connectSrc: ["'self'"], // Applies to XMLHttpRequest (AJAX), WebSocket or EventSource. If not allowed the browser emulates a 400 HTTP status code
        fontSrc: ["'self'"], // Defines valid sources of fonts
        objectSrc: ["'none'"], // Defines valid sources of plugins, eg <object>, <embed> or <applet>.
        mediaSrc: ["'self'"], // Defines valid sources of audio and video, eg HTML5 <audio>, <video> elements
        frameSrc: ["'none'"], // Defines valid sources for loading frames
      },
    },
    // Disables DNS prefetching
    dnsPrefetchControl: false,
    // Prevents clickjacking by setting the X-Frame-Options header
    frameguard: {
      action: 'deny',
    },
    // Removes the X-Powered-By header to make it slightly harder for attackers to see what potentially-vulnerable technology stack is being used
    hidePoweredBy: true,
    // Implements HTTP Strict Transport Security (HSTS) to keep user sessions secure
    hsts: {
      maxAge: 60 * 60 * 24 * 365, // Must be at least 1 year to be approved by Google's HSTS preload service
      includeSubDomains: true, // If enabled, the rule applies to all of the site's subdomains as well
      preload: true,
    },
    // Prevents Internet Explorer from executing downloads in site's context
    ieNoOpen: true,
    // Prevents browsers from trying to MIME-sniff the content-type
    noSniff: true,
    // Helps to protect against XSS attacks
    xssFilter: true,
  })
);
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).json({ mes: 'Hello World!' });
  next();
});

app.use('/api', protect, router);

// Group user related routes
const userRouter = express.Router();
userRouter.post('/user', createNewUser);
userRouter.post('/signin', signin);
app.use('/user', userRouter);

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

export default app;
