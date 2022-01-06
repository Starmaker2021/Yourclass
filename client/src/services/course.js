import request from '../config/request';
const CourseService = {
  getList:(params) => request.get('/api/course/list', {params}),
  purchase:(params) => request.post('/api/course/purchase', {data:params}),
  add:(params) => request.post('/api/course/add', {data:params}),
  getProgress:(params) => request.get('/api/course/getProgress', {params}),
  addProgress:(params) => request.post('/api/course/addProgress', {data:params}),
  getExam:(params) => request.get('/api/course/getExam', {params}),
  getExamList:(params) => request.get('/api/course/getExamList', {params}),
  updateExam:(params) => request.post('/api/course/updateExam', {data:params}),
  delLecture:(params) => request.post('/api/course/delLecture', {data:params}),
  updateMark:(params) => request.post('/api/course/updateMark', {data:params}),
  getMark:(params) => request.get('/api/course/getMark', {params}),
  checkPurchase:(params) => request.post('/api/course/checkPurchase', {data:params}),
  getPurchase:(params) => request.get('/api/course/getPurchase', {params}),
  getProfit:(params) => request.get('/api/course/getProfit', {params}),
  auditPurchase:(params) => request.post('/api/course/auditPurchase', {data:params})
}

export default CourseService