import request from '../config/request';
const  Dict = {
  getDict:(params) => request.get('/dict?t=1', {params})
}
export default Dict