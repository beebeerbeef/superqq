import * as axios from 'common/js/axios'

// 用户注册
const register = params => axios.post('/user/register', params)

// 用户登录
const login = params => axios.post('/user/login', params)

// 用户登出
const logout = params => axios.post('/user/logout', params)

// 完善用户信息
const updataUserInfo = params => axios.post('/user/updataUserInfo', params)

// 获取用户信息
const getUserInfo = params => axios.post('/user/getUserInfo', params)

//上传聊天记录
const addChat = params => axios.post('/user/addChat', params)

//获取聊天记录
const getChat = params => axios.post('/user/msgList', params)

//刷新页面重新验证登录信息
const reLogin = params => axios.post('/user/relogin', params)

export {
  register,
  login,
  updataUserInfo,
  getUserInfo,
  logout,
  addChat,
  getChat,
  reLogin
}
