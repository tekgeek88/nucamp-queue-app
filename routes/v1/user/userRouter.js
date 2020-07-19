var express = require('express');
var router = express.Router({ mergeParams: true });
import User from '../../../database/schemas/user'

/* POST: Register a new user. */
router.use('/signup', require('./signup'));

/*  POST: Sign in a user */
router.use('/login', require('./login'));

/*  DELETE: Logs current user out if a session exists */
router.use('/logout', require('./logout'));

/* GET all users */
router.route('/')
  .get((req, res, next) => {
    User.find()
      .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      })
      .catch(err => next(err));
  });


module.exports = router;



