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
      return {
        queues: [...action.payload]
      };
    case RECEIVE_QUEUE:
      return {
        queue: action.payload.queue
      };
    default:
      return state;
  }
};

