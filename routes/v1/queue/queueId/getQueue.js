const express = require('express');
const router = express.Router({mergeParams: true});
import Queue from "../../../../database/schemas/queue";

/* GET: Get a queue by id. */
router.get('/', async (req, res) => {
  const queue = await Queue.findById(req.params.queueId)
    .populate('items.userId', {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1
    })
    .populate('owner', {
      _id: 1,
      firstname: 1,
      lastname: 1,
      email: 1
    });

  if (!queue) {
    res.status(400).json({
      success: false,
      message: "A Queue with the id does not exist!"
    });
  }

  res.status(200).json({
    success: true,
    queue
  });
});

module.exports = router;
