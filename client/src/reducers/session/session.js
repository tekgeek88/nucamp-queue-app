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
      return {...state, ...action.payload};
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

