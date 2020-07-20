var express = require('express');
var router = express.Router({mergeParams: true});
import Queue from "../../../database/schemas/queue";

/* GET: Get all queues */
router.route('/').get((req, res, next) => {
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
    const {id} = req.session.user;
    const {name, description} = req.body;

    console.log("Creating queue for: " + id);

    const queue = new Queue({
      owner: id,
      name,
      description
    });
    await queue.save();
    res.status(200).json(queue);

  } catch (err) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: []
    });
  }
});

router.use('/:queueId/item', require('./queueId/item/queueItemRouter'));

router.use('/:queueId', require('./queueId/getQueue'));

router.use('/:queueId', require('./queueId/deleteQueue'));


module.exports = router;



