import {clearErrors, receiveErrors} from "./error";
import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./actionTypes";
import qService from "../api/qService";


const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  payload: user
});


const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});


export const checkLoggedIn = async () => {
  const null_session = {
    session: {
      _id: null,
      firstname: null,
      lastname: null,
      email: null,
      role: "",
    }
  };
  return await qService.get('/user/isLoggedIn')
    .then(response => {
      if (response.status === 200) {
        const {user} = response.data;
        if (user) {
          return { session: user };
        }
      }
      return null_session
    })
    .catch(err => {
      // Maybe we should send a toast here or something
    });
};


export const login = user => async dispatch => {
  return await qService.post('/user/login', user)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveCurrentUser(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(err => {
      // Maybe we should send a toast here or something
    })
};


export const signup = user => async dispatch => {
  return await qService.post('/user/signup', user)
    .then(response => {
      if (response.status === 200) {
        dispatch(clearErrors());
        return dispatch(receiveCurrentUser(response.data));
      } else {
        return dispatch(receiveErrors(response.data));
      }
    }).catch(err => {
      // Maybe we should send a toast here or something
    })
};


export const logout = () => async dispatch => {
  return await qService.delete('/user/logout')
    .then(response => {
      if (response.status === 200) {
        return dispatch(logoutCurrentUser());
      } else {
        dispatch(receiveErrors(response.data));
      }
    }).catch(err => {
      // Maybe we should send a toast here or something
    });
};
