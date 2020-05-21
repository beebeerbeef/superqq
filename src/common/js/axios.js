import axios from 'axios'
import qs from 'qs'
import getUrl from './baseUrl'
import router from '@/router/index'
import store from 'store/index'
// import i18n from '../../language'
// 配置axios的config
const language = 'mx'
// axios.defaults.baseURL = '/api'
const config = {
  baseURL: '/api'
}
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
 
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // 返回 403 清除token信息并跳转到登录页面
          localStorage.removeItem('token')
          router.replace({
            path: '/login'
          })
          store.state.mydialog = false 
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
　　
const get = (url, params) => {
  url = urlEncode(url, params)
  return axios.get(url, config)
}

const post = (url, params, con) => {
  return axios.post(url, params, config)
}

// 用来拼接get请求的时候的参数
let urlEncode = (url, data) => {
  if (typeof (url) === 'undefined' || url === null || url === '') return ''
  if (typeof (data) === 'undefined' || data === null || typeof (data) !== 'object') return url
  url += (url.indexOf('?') !== -1) ? '' : '?'
  for (let k in data) {
    url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(data[k])
  }
  return url
}

export {
  get,
  post
}