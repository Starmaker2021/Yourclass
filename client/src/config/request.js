import { extend } from 'umi-request';
import {server} from './config';
import { createBrowserHistory } from 'history'; // 如果是history路由
import {message as Message} from 'antd'
// request error handler
const errorHandler = function(error) {
  const codeMap = {
    '1': 'error'
  };
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }
  throw error; // 如果throw. 错误将继续抛出.
};

const request = extend({
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  // withCredentials: true, // 允许携带cookie,
  credentials: 'include',
  errorHandler
});
// request interceptor, change url or options.
request.interceptors.request.use((url, options) => {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return ({
    url: `${server}${url}`,
    options: { ...options, interceptors: true, headers}
  })
});
// response interceptor, change response
request.interceptors.response.use(async (response, options) => {
  const contentType = response.headers.get('Content-Type');
  const data = await response.clone().json();
  try{
    const data = await response.clone().json();
    if(data.code === -2){
      sessionStorage.clear()
      window.location.href = '/login'
      Message.error(data.message)
    }else if(data.code === -1){
      Message.error(data.message)
    }else{
      return data;
    }
  }catch (e){
    console.log(e)
  }
});

export default request;