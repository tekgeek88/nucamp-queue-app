var express = require('express');
var router = express.Router({mergeParams: true});
import Queue from "../../../database/schemas/queue";

/* GET: Get all queues */
router.route('/').get((req, res) => {
  Queue.find()
    .then(queues => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(queues);
    })
    .catch(err => next(err));
});

/* POST: Create a queue */
router.route('/').post(async (req, res) => {
  const {name, description} = req.body;
  const queue = new Queue({
    name,
    description
  });
  await queue.save();
  res.status(200).json(queue);
});

router.use('/:queueId/item', require('./queueId/item/queueItemRouter'));

router.use('/:queueId', require('./queueId/getQueue'));
router.use('/:queueId', require('./queueId/deleteQueue'));




module.exports = router;



