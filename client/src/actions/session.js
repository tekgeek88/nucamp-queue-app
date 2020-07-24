import {clearErrors, receiveErrors} from "./error";
import {toast} from "react-toastify";
import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./actionTypes";
import _ from 'lodash';
import axios from "axios";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  payload: user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const login = user => async (dispatch) => {
  setProgressBar(true);
  return await UserService.login(user)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        setProgressBar(false);
        return dispatch(receiveCurrentUser(response.data));
      } else {
        setProgressBar(false);
        return dispatch(receiveErrors(response.data));
      }
    }).catch(error => {
      console.log(error);
    })
};


export const signup = user => async dispatch => {
  setProgressBar(true);
  const response = await UserService.register(user);
  const data = await response.json();
  if (response.ok) {
    dispatch(clearErrors());
    setProgressBar(false);
    return dispatch(receiveCurrentUser(data));
  }
  setProgressBar(false);
  return dispatch(receiveErrors(data));
};

export const logout = () => async dispatch => {
  setProgressBar(true);
  const response = await UserService.logout();
  const data = await response;

  if (response.ok) {
    setProgressBar(false);
    return dispatch(logoutCurrentUser());
  }
  setProgressBar(false);
  return dispatch(receiveErrors(data));
};
