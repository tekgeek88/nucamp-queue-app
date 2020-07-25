import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
} from "../../actions/actionTypes";

const _nullSession = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  role: "",
  connections: [],
  selectedOption: {},
  userConnections: []
};

export default (state = _nullSession, action) => {
  // Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log("We are recieving the user");
      console.log(action)
      return {...state, ...action.payload.user};
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

