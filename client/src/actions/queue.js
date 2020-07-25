import {RECEIVE_QUEUES} from "./actionTypes";
import {clearErrors, receiveErrors} from "./error";
import * as QueueService from '../api/queueService';

const receiveAllQueues = queues => ({
  type: RECEIVE_QUEUES,
  payload: queues
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

