import request from '../config/request';
/**
 * notice service
 * @type {{add: (function(*=): Promise<any>), del: (function(*=): Promise<any>), list: (function(*): Promise<any>)}}
 */
const NoticeService = {
  list:(params) => request.get('/api/notice/list', {params}),
  add:(params) => request.post('/api/notice/add', {data:params}),
  del:(params) => request.post('/api/notice/del', {data:params})
}

export default NoticeService