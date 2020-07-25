import {
  RECEIVE_QUEUES,

} from "../../actions/actionTypes";

const DEFAULT_STATE = {
  queue: []
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
    default:
      return state;
  }
};

