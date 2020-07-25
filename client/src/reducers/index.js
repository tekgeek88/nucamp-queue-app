import { combineReducers } from 'redux';

import error from "./errors";
import session from "./session";
import queue from "./queue"
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  session,
  error,
  queueStore: queue,
  form: formReducer
});
