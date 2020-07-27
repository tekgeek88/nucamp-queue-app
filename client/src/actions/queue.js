import {RECEIVE_QUEUE, RECEIVE_QUEUES} from "./actionTypes";
import {clearErrors, receiveErrors} from "./error";
import qService from "../api/qService";


const receiveAllQueues = queues => ({
  type: RECEIVE_QUEUES,
  payload: queues
});


const receiveQueue = queue => ({
  type: RECEIVE_QUEUE,
  payload: queue
});


export const fetchAllQueues = () => async (dispatch) => {
  return await qService.get('/queue')
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveAllQueues(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    })
    .catch(err => {
      // Maybe we should send a toast here or something
    });
};


export const fetchQueue = queueId => async (dispatch) => {
  return await qService.get(`/queue/${queueId}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveQueue(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      // Maybe we should send a toast here or something
    })
};

export const createQueue = nameAndDesc => async (dispatch) => {
  return await qService.post(`/queue`, nameAndDesc)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveAllQueues(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      // Maybe we should send a toast here or something
    })
};

