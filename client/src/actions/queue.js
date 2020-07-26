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
  return await QueueService.fetchAllQueues(queues)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveAllQueues(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};

export const fetchQueue = queueId => async (dispatch) => {
  return await QueueService.fetchQueue(queueId)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveQueue(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};

