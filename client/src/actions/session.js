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
        console.log("response data");
        console.log(response.data);
        dispatch(clearErrors());
        return dispatch(receiveCurrentUser(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};


export const signup = user => async dispatch => {
  console.log("Hitting the signup endpoint");
  return await QueueService.signup(user)
    .then(response => {
      if (response.status === 200) {
        console.log("response data");
        console.log(response.data);
        dispatch(clearErrors());
        return dispatch(receiveCurrentUser(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};


export const logout = () => async dispatch => {
  const response = await QueueService.logout();
  const data = await response;
  if (response.ok) {
    return dispatch(logoutCurrentUser());
  }
  return dispatch(receiveErrors(data));
};
