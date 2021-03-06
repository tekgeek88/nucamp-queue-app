let express = require('express');
const morgan = require("morgan");
const cors = require('cors');
import mongoose from 'mongoose';
import session from 'express-session';
import connectStore from 'connect-mongo';
import {SESS_LIFETIME, SESS_NAME, SESS_SECRET} from "./config/config";

module.exports = function buildApp() {

  // Get an instance of an Express.js web server and start the logger
  const app = express();
  app.use(morgan('dev'));
  // Use connect-mongo to handle adding cookies to the database
  const MongoStore = connectStore(session);
  app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
      ttl: parseInt(SESS_LIFETIME) / 1000,
    }),
    saveUninitialized: true,
    resave: true,
    cookie: {
      sameSite: false,
      // secure: NODE_ENV === 'production',
      secure: false,
      maxAge: parseInt(SESS_LIFETIME)
    }
  }));

  // Dont advertise that our server is running Express.js
  app.use(cors()).disable('x-powered-by');

  // Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
  app.use(function (req, res, next) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
  });


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

