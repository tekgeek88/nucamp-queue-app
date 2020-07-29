import Queue from "../database/schemas/queue";
import User from '../database/schemas/user'

const isEmpty = require("is-empty");

export default async function validateQueueItem(req) {
  let errors = [];

  let {userId} = req.body;
  userId = userId ? userId : req.session.user._id;
  let user = null;
  let queue = null;

  try {
    queue = await Queue.findById({_id: req.params.queueId});
    if (!queue) {
      errors.push({"queue": "A valid QueueID is required"});
      return {errors}
    }

    user = await User.findById({_id});
    if (!user) {
      errors.push({"userId": "A valid UserID is required"});
      return {errors}
    }
  } catch (err) {
    errors.push({"queue": "validateLoginInput failed something fierce"});
  }

  console.log("Looking for duplicate userIds in the queue");
  const duplicates = queue.items.filter(item => String(item.userId) === String(userId));
  if (!isEmpty(duplicates)) {
    errors.push({"userId": "That UserId already exists in the queue"});
  }
  return {
    errors
  };
}