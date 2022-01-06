import request from '../config/request';

/**
 * User Interface
 */
const User =  {
  register:(params) => request.post('/api/user/register', {data:params}),
  login:(params) => request.post('/api/user/login', {data:params}),
  logout:(params) => request.get('/api/user/logout', {data:params}),
  getUserList:(params) => request.get('/api/user/list', {params}),
  verify:(params) => request.post('/api/user/verify', {data:params}),
  deposit:(params) => request.post('/api/user/deposit', {data:params})
}
export default User