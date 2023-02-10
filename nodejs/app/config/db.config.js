const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../../environments/'+`${process.env.NODE_ENV}.env`)
});

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,
  pool: {
    max:  parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: process.env.POOL_ACQUIRE,
    idle: process.env.POOL_IDLE
  }
};