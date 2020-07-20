var express = require('express');
var router = express.Router({ mergeParams: true });
import auth_required from "../../middleware/auth_required";

/* GET users listing. */
router.use('/user', require('./user/userRouter'));



/* GET users listing. */
router.use('/queue', auth_required, require('./queue/queueRouter'));

module.exports = router;
