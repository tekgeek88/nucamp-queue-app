var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.use('/v1', require('./v1/v1Router'));

module.exports = router;
