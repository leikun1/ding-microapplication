import axios from 'axios';
const token = localStorage.getItem('token');
import app_config from '../config/app'
const api=app_config.apiUrl;
axios.defaults.headers.common['Authorization'] = 'Bearer '+token
// 设置Api请求路由.
export const createAPI = PATH => `${api}/${PATH}`;

/*// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  return Promise.reject(error);
});*/
// 响应拦截器
/*axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
    if(error.response){
      if(error.response.status===401){
        localStorage.removeItem('token');
        window.location.reload();
        return  error;
      }
    }
    return Promise.reject(error);
});*/
export const post = (PATH,PARAM={}) => {
    let path=createAPI(PATH);
    let param =PARAM;
    return axios.post(path,param);
};
// get 请求
export const get = (PATH) => {
    let path = createAPI(PATH);
    return axios.get(path);
};
// put 请求
export const put = (PATH,PARAM={}) => {
  let path=createAPI(PATH);
  let param =PARAM;
  return axios.put(path,param);
};
// put 请求
export const patch = (PATH,PARAM={}) => {
  let path=createAPI(PATH);
  let param =PARAM;
  return axios.put(path,param);
};
// put 请求
// post 请求
export const deleteHttp = (PATH) => {
  let path = createAPI(PATH);
  return axios.delete(path);
};
export default axios;