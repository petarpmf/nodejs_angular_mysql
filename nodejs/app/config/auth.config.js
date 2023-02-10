const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../../environments/'+`${process.env.NODE_ENV}.env`)
});

module.exports = {
  secret: process.env.SECRET,
  // jwtExpiration: 3600,         // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  jwtExpiration: parseInt(process.env.JWT_EXPIRATION),          // 1 minute
  jwtRefreshExpiration: parseInt(process.env.JWT_EXPIRATION),  // 2 minutes
};