import {clearErrors, receiveErrors} from "./error";
import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./actionTypes";
import * as QueueService from '../api/queueService';

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  payload: user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});


export const login = user => async (dispatch) => {
  console.log("Hitting the login endpoint");
  return await QueueService.login(user)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        console.log("response data");
        console.log(response.data);
        return dispatch(receiveCurrentUser(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};


export const signup = user => async dispatch => {
  const response = await QueueService.register(user);
  const data = await response.json();
  if (response.ok) {
    dispatch(clearErrors());
    return dispatch(receiveCurrentUser(data));
  }
  return dispatch(receiveErrors(data));
};


export const logout = () => async dispatch => {
  const response = await QueueService.logout();
  const data = await response;
  if (response.ok) {
    return dispatch(logoutCurrentUser());
  }
  return dispatch(receiveErrors(data));
};
