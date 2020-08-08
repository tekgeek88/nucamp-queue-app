import Queue from "../../../../../database/schemas/queue";
import queueItemValidator from "../../../../../validation/queueItemValidator";

const express = require('express');
const router = express.Router({mergeParams: true});
const isEmpty = require("is-empty");

/* GET users listing. */
router.get('/', async (req, res) => {

  try {
    const items = await Queue.findOne({_id: req.params.queueId, "items.startTime": null})
      .populate('items.userId', {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1
      })
      .sort({createdOn: 1})
      .select({items: 1});
    if (!isEmpty(items)) {
      let item = {};
      if (!isEmpty(items.items)) {
        item = items.items[0];
      }
      return res.status(200).json({
        success: true,
        item: {
          _id: item._id,
          startTime: item.startTime,
          endTime: item.endTime,
          user: item.userId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      })
    }
    return res.status(400).json({
      success: true,
      message: "There are no items in the queue!"
    })

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }
});

router.put('/:queueItemId', async (req, res, next) => {
  Queue.findById(req.params.queueId)
    .then(queue => {
      if (queue && queue.items.id(req.params.queueItemId)) {
        // startTime
        if (req.body.startJob === true) {
          queue.items.id(req.params.queueItemId).startTime = new Date();
        }
        if (req.body.endJob === true) {
          queue.items.id(req.params.queueItemId).endTime = new Date();
        }

        // Here we'll check the user id to check for the owner of the Queue and QueueItem to do certain tasks
        let userId = req.session.user.id;

        return queue.save()
          .then(q => res.status(200).json(q))
          .catch(err => next(err));

        // if (req.user._id.equals(queue.items.id(req.params.queueItemId).author._id)) {
        //   return queue.save()
        //     .then(q => res.status(200).json(q))
        //     .catch(err => next(err));
        // }
        // else {
        //   let err = new Error(`Only an author can modify his own comment`);
        //   err.status = 403;
        //   return next(err);
        // }

      }
        // else if (!queue) {
        //   err = new Error(`Campsite ${req.params.campsiteId} not found`);
        //   err.status = 404;
        //   return next(err);
      // }
      else {
        err = new Error(`Queue item ${req.params.queueItemId} not found`);
        err.status = 404;
        return next(err);
      }
    })
    .catch(err => next(err));
});

/* POST: Add an item to the queue */
router.post('/', async (req, res) => {

  try {
    let {userId} = req.body;
    userId = userId ? userId : req.session.user._id;
    // Form validation
    const {errors} = await queueItemValidator(req);

    if (!isEmpty(errors)) {
      return res.status(400).json({
        success: false,
        message: "queueItemValidator failed!",
        errors
      })
    }
    console.log("Finished checking for errors");
    let queue = await Queue.findById({_id: req.params.queueId});

    if (!queue) {
      return res.stat(400).json({
        success: false,
        message: "Queue not found!"
      })
    }
    await queue.items.push({userId});
    await queue.save();

    queue = await Queue.findById(req.params.queueId)
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
      });

    res.status(200).json({
      success: true,
      queue
    });

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
