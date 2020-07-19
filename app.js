let express = require('express');
const morgan = require("morgan");
const cors = require('cors');
import mongoose from 'mongoose';
import session from 'express-session';

module.exports = function buildApp() {

  // Get an instance of an Express.js web server and start the logger
  const app = express();
  app.use(morgan('dev'));

  // Dont advertise that our server is running Express.js
  app.use(cors()).disable('x-powered-by');

  // Bump up our JSON limits
  app.use(express.json({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
  }));

  // Bump up our parameter limits
  app.use(express.urlencoded({extended: true, parameterLimit: 100000}));

  // Load up our api middleware
  app.use('/api', require('./routes/rootRouter'));

  return app;
}();

