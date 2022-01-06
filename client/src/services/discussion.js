import request from '../config/request';
/**
 * discussion service
 * @type {{updateChatById: (function(*=): Promise<any>), getList: (function(*): Promise<*>), getChatById: (function(*): Promise<any>)}}
 */
const DiscussionService = {
  //get discussion list (lecturer)
  getList:(params) => request.get('/api/discussion/getList', {params}),
  getChatById:(params) => request.get('/api/discussion/getChatById', {params}),
  updateChatById:(params) => request.post('/api/discussion/updateChatById', {data:params})
}

export default DiscussionService