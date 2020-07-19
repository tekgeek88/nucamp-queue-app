var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.use('/user', require('./user/userRouter'));



/* GET users listing. */
router.use('/queue', require('./queue/queueRouter'));

module.exports = router;
