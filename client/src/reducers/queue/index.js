import {
  RECEIVE_QUEUES,
  RECEIVE_QUEUE
} from "../../actions/actionTypes";

const DEFAULT_STATE = {
  queues: [],
  queue: {}
};

export default (state = DEFAULT_STATE, action) => {
  // Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUEUES:
      console.log("We are receiving the queues");
      console.log(action);
      return {
        queues: [...action.payload]
      };
    case RECEIVE_QUEUE:
      console.log("We are receiving a queue");
      console.log(action);
      return {
        queue: action.payload.queue
      };
    default:
      return state;
  }
};

