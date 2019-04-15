require('dotenv/config');

const env = process.env;

module.exports = {
  currEnv: env.NODE_ENV || 'development',
  port: env.PORT || 4000,
  db: env.MONGO_URI || 'mongodb://localhost:27017/contracts'
};
