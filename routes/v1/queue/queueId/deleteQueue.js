const express = require('express');
const router = express.Router({mergeParams: true});
import Queue from "../../../../database/schemas/queue";

/* DELETE: Delete a queue by id. */
router.delete('/', async (req, res) => {
  Queue.findByIdAndDelete(req.params.queueId)
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        message: `Successfully deleted queue ${req.params.queueId}`
      });
    })
    .catch(err => next(err));
});

module.exports = router;
