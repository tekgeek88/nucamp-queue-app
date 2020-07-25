import { combineReducers } from 'redux';

import error from "./errors/errors";
import session from "./session/session";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  session,
  error,
  form: formReducer
});
