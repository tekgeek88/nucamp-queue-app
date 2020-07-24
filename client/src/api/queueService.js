import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000'
});

const _nullSession = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  role: null
};


export const login = async (user) => {
  let result = {};
  await axios({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    method: 'post',
    url: '/api/v1/users/login',
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
  return await fetch("/api/v1/users/logout", {
    method: "DELETE", headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
};

export const register = async user => (
  fetch("/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);

export const checkLoggedIn = async () => {
  const response = await fetch('/api/v1/user/isLoggedIn', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  let user = {};
  try {
    user = await response.json();
  } catch (err) {
    console.log("Handled that shit")
  }

  // const {userId="", email="", firstName="", lastName=""} = user;
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