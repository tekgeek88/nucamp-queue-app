import { combineReducers } from 'redux';

import error from "./errors/errors";
import session from "./session/session";

export default combineReducers({
  session,
  error
});
