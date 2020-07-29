import {
  LOGOUT_CURRENT_USER,
  RECEIVE_CURRENT_USER,
} from "../../actions/actionTypes";

const _nullSession = {
  _id: null,
  email: null,
  firstname: null,
  lastname: null,
  role: ""
};

export default (state = _nullSession, action) => {
  // Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {...state, ...action.payload.user};
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

