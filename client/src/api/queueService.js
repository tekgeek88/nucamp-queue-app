import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000'
});

export const login = async (user) => {
  let result = {};
  await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'post',
    url: '/api/v1/user/login',
    data: user
  })
    .then(response => {
      result = response;
    })
    .catch(err => {
      result = err.response
    });
  return result;
};

export const logout = async () => {
  console.log("Attempting to log out");
  return await fetch("/api/v1/user/logout", {
    method: "DELETE", headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
};

export const signup = async user => {
  let result = {};
  await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'post',
    url: '/api/v1/user/signup',
    data: user
  })
    .then(response => {
      result = response;
    })
    .catch(err => {
      result = err.response
    });
  return result;
};

const _nullSession = {
  userId: null,
  email: null,
  firstname: null,
  lastname: null,
};

export const checkLoggedIn = async () => {
  const response = await fetch('/api/v1/user/isLoggedIn', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const {user} = await response.json();


  let preloadedState = _nullSession;
  if (user) {
    preloadedState = {
      session: {
        userId: user.userId ? user.userId : "",
        email: user.email ? user.email : "",
        firstname: user.firstname ? user.firstname : "",
        lastname: user.lastname ? user.lastname : "",
        role: user.role ? user.role : "",
      }
    };
  }
  return preloadedState;
};

export const fetchAllQueues = async (user) => {
  let result = {};
  await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'get',
    url: '/api/v1/queue'
  })
    .then(response => {
      result = response;
    })
    .catch(err => {
      result = err.response
    });
  return result;
};

export const fetchQueue = async (queueId) => {
  let result = {};
  await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'get',
    url: `/api/v1/queue/${queueId}`
  })
    .then(response => {
      result = response;
    })
    .catch(err => {
      result = err.response
    });
  return result;
};