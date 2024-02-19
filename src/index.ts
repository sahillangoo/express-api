/*
 * Intro: This is the Entry Point to Node Express API.
 * Database & ORM: Postgress & Prisma
 * Auth: JWT & Bcrypt
 */

import * as dotenv from 'dotenv';
import app from './server';
import config from './config';

dotenv.config();

// Validate environment variables
if (!process.env.PORT) {
  console.error('Missing environment variable: PORT');
  process.exit(1);
}

const port = config.PORT;

app.listen(port, (err?: Error) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }

  console.info(`Server started listening on ${port}\n Visit http://localhost:${port}`);
});
