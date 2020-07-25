import {RECEIVE_QUEUE, RECEIVE_QUEUES} from "./actionTypes";
import {clearErrors, receiveErrors} from "./error";
import * as QueueService from '../api/queueService';

const receiveAllQueues = queues => ({
  type: RECEIVE_QUEUES,
  payload: queues
});

const receiveQueue = queue => ({
  type: RECEIVE_QUEUE,
  payload: queue
});

export const fetchAllQueues = queues => async (dispatch) => {
  console.log("Fetching all queues...");
  return await QueueService.fetchAllQueues(queues)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        console.log("getQueues response data");
        console.log(response.data);
        return dispatch(receiveAllQueues(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};

export const fetchQueue = queueId => async (dispatch) => {
  console.log("Fetching queue...");
  return await QueueService.fetchQueue(queueId)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        console.log("getQueue response data");
        console.log(response.data);
        return dispatch(receiveQueue(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};

