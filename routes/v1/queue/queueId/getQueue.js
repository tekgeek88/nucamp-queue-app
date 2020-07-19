const express = require('express');
const router = express.Router({mergeParams: true});
import Queue from "../../../../database/schemas/queue";

/* GET users listing. */
router.get('/', async (req, res) => {
  Queue.findById(req.params.queueId)
    .then(queue => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(queue);
    })
    .catch(err => next(err));
});

module.exports = router;
