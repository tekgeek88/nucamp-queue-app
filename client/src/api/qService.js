import axios from 'axios';

const qService = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

qService.defaults.headers.common['Content-Type'] = 'application/json';
qService.defaults.headers.common['Accept'] = 'application/json';

qService.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default qService;
