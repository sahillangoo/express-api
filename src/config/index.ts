process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

export default Object.assign(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3001,
    logging: true,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
