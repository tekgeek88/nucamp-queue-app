const express = require('express');
const router = express.Router({mergeParams: true});
import Queue from "../../../../../database/schemas/queue";

/* GET users listing. */
router.get('/', async (req, res) => {
  Queue.find({
    query: {startTime: null},
    sort: {createdOn: 1},
  })
    .then(queue => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(queue);
    })
    .catch(err => next(err));

});

/* POST: Add an item to the queue */
router.post('/', async (req, res) => {
  Queue.findById(req.params.queueId)
    .then(queue => {
      if (queue) {
        queue.items.push(req.body);
        campsite.save()
          .then(campsite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite);
          })
          .catch(err => next(err));
      } else {
        err = new Error(`Campsite ${req.params.campsiteId} not found`);
        err.status = 404;
        return next(err);
      }
    })
    .catch(err => next(err));




  const {userId} = req.body;
  const queue = new Queue({
    'startTime': null,
    'endTime': null,
    userId
  });
  await queue.save();
  res.status(200).json(queue);
});

module.exports = router;
