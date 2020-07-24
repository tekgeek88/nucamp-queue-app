import { RECEIVE_ERRORS, CLEAR_ERRORS } from "./actionTypes";

export const receiveErrors = (error) => ({
  type: RECEIVE_ERRORS,
  payload: error
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
