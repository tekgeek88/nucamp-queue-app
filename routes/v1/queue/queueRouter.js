import auth_required from "../../../middleware/auth_required";

var express = require('express');
var router = express.Router({mergeParams: true});
import Queue from "../../../database/schemas/queue";

/* GET: Get all queues */
router.route('/', auth_required).get((req, res, next) => {
  Queue.find()
    .populate('owner', {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1
    })
    .populate('items.userId', {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1
    })
    .then(queues => {
      res.status(200).json(queues);
    })
    .catch(err => {
      next(err)
    });
});

/* POST: Create a queue */
router.route('/').post(async (req, res) => {
  try {
    console.log(req.session);
    const {_id} = req.session.user;
    const {name, description} = req.body;

    console.log("Creating queue for: " + _id);

    const queue = new Queue({
      owner: _id,
      name,
      description
    });
    await queue.save();
    await Queue.find()
      .populate('owner', {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1
      })
      .populate('items.userId', {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1
      })
      .then(queues => {
        return res.status(200).json(queues);
      })
      .catch(err => {
        next(err)
      });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: []
    });
  }
});

router.use('/:queueId/item', require('./queueId/item/queueItemRouter'));

router.use('/:queueId', require('./queueId/getQueue'));

router.use('/:queueId', require('./queueId/deleteQueue'));


module.exports = router;



