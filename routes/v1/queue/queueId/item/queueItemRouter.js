import Queue from "../../../../../database/schemas/queue";
import queueItemValidator from "../../../../../validation/queueItemValidator";

const express = require('express');
const router = express.Router({mergeParams: true});
const isEmpty = require("is-empty");

/* GET users listing. */
router.get('/', async (req, res) => {

  try {
    const {items} = await Queue.findOne({_id: req.params.queueId, "items.startTime": null})
      .populate('items.userId', {
        _id: 1,
        firstname: 1,
        lastname: 1,
        email: 1
      })
      .sort({createdOn: 1})
      .select({items: 1});

    if (!isEmpty(items)) {
      let item = items[0];
      console.log(item);

      const {
        startTime,
        endTime,
        _id,
        userId: user,
        createdAt,
        updatedAt

      } = item;

      return res.status(200).json({
        success: true,
        item: {
          _id,
          startTime,
          endTime,
          user,
          createdAt,
          updatedAt
        }
      })
    }

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }
});

router.delete('/', async (req, res) => {

  try {


    let options = {
      new: true,
      sort: {createdOn: 1}
    };

    const item = await Queue.findOneAndUpdate({
      _id: req.params.queueId,
      "items.startTime": null}, {$set: {'startTime': new Date()}},
      options);

    console.log(item)

    return res.status(200).json({
      success: true,
      item
    })


  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }
});

/* POST: Add an item to the queue */
router.post('/', async (req, res) => {

  try {
    let {userId} = req.body;
    userId = userId ? userId : req.session.user.id;
    // Form validation
    const {errors} = await queueItemValidator(req);

    if (!isEmpty(errors)) {
      return res.status(400).json({
        success: false,
        message: "queueItemValidator failed!",
        errors
      })
    }

    const queue = await Queue.findById({_id: req.params.queueId});

    if (!queue) {
      return res.stat(400).json({
        success: false,
        message: "Queue not found!"
      })
    }

    queue.items.push({
      userId
    });
    queue.save();

    return res.status(200).json({
      success: true,
      message: `Added ${userId} to queue`
    })

  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
