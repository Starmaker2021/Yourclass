import request from '../config/request';
const  UploadService = {
  upload:(params) => request.post('/upload', {params})
}
export default UploadService