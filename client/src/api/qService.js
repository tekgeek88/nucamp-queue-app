import axios from 'axios';

const qService = axios.create({
  baseURL: '/api/v1'
});

qService.defaults.headers.common['Content-Type'] = 'application/json';
qService.defaults.headers.common['Accept'] = 'application/json';
// qService.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// qService.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
// qService.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';

qService.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export default qService;
