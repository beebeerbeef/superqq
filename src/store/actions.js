import * as types from './mutation-types'
import axios from 'axios'
import { Loading } from '../Plugins/index'
import { getPoetryList, addPoetryItem, linkThisPoetry } from 'api/home'
import { register, updataUserInfo, getUserInfo, login, logout, addChat, getChat, reLogin } from 'api/account'
import { getPoetryDetail, getTransmitList, getSupportList, subscription, getUserFans, getUserAttentionlist } from 'api/poetry'
import { sendComment, getAllComments } from 'api/comment'
import { getChatMsgList, readMsg } from 'api/chat'
// import { getChatId } from 'common/js/common'
import io from 'socket.io-client'
// const socket = io('ws://localhost:3001')

const getSocket = function ({commit, state}) {
  let socket = io('ws://localhost:3001')
  commit(types.SET_SOCKET, socket)
}
 
const setuserid = function ({commit, state}, {userid}) {
  commit(types.SET_USER_ID, userid)
}

const tuling = function ({commit, state}, {from, to, content}) {
  let userInfo = {'apiKey': '3cdfea4cd15441aa89ff0c8947d8ac83', 'userId': 12138}
  let params = {'perception': {'inputText': {'text': content}}, 'userInfo': userInfo}
  let flag = false
  let msg = {from, to, content}
  console.log(msg)
  addChat({msg}).then(res => {
    if(res.data.code === 200) {
      flag = true
      let data = [...state.msglist, {...msg, created_at: res.data.time}] 
      commit(types.SET_MSG_LIST, data)
      console.log('1_success')
    }
  })
  axios.post('/tuling', params).then(res => {
    console.log(res.data.results[0].values.text)
    let a = res.data.results[0].values.text
    let msg = {'from': 0, 'to': from, 'content': a}
    addChat({msg}).then(res => {
      if(res.data.code === 200) {
        let data = [...state.msglist, {...msg, created_at: res.data.time}] 
        commit(types.SET_MSG_LIST, data)
        console.log('0_success')
      }
    })
    return res.data.results[0].values.text
  })
}

const upload = function ({commit, state}, {userinfo}) {
  axios.post('/upload', params).then(res => {
    if(res.data.code === 0) {
      console.log('上传成功')
    }
  })
}

const chat = function ({commit, state}, {userinfo}) {
  getChat({userinfo}).then(res => {
    console.log(res.data)
    commit(types.SET_MSG_LIST, res.data)
  })
}


const registerAccount = function ({commit, state}, {userinfo}) {
  // 用户注册
  // 这里返回一个Promise函数，方便在组件中知道当前接口是否请求完成
  return new Promise((resolve, reject) => {
    register({userinfo}).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 200) {
        resolve(res)
      } else {
        reject(new Error())
      }
    })
  })
}

const _updataUserInfo = function ({commit, state}, {userinfo}) {
  // 完善用户信息
  return new Promise((resolve, reject) => {
    updataUserInfo({userinfo}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        resolve(res.data.data)
      } else {
        reject(new Error())
      }
    })
  })
}

const _getUserInfo = function ({commit, state}, {userid, socketid}) {
  // 获取用户信息
  // console.log(userid)
  return new Promise((resolve, reject) => {
    let userinfo = {userid, socketid}
    getUserInfo({userinfo}).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        commit(types.SET_USER_INFO, res.data.userinfo)
        resolve(res.data.userinfo)
      } else {
        reject(new Error())
      }
    })
  })
}

const userLogin = function ({commit, state}, {userinfo}) {
  // 用户登录
  return new Promise((resolve, reject) => {
    login({userinfo}).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        resolve(res)
        console.log('登录成功')
      } else {
        console.log('密码错误')
      }     
    })
  })
}

const relogin = function ({commit, state}, {token}) {
  reLogin({token}).then(res => {
    if (res.data.code === 200) {
      console.log('登录成功')
    }

  })
}

const userLogout = function ({commit, state}, {userinfo}) {
  //用户登出
  return new Promise((resolve,reject) => {
    console.log({userinfo})
    logout({userinfo}).then(res => {
      if (res.status === 200 && res.data.code ===200) {
        resolve(res)
        console.log('登出成功')
      }
    })
  })
}

const sendMsg = function ({commit, state}, {from, to, content}) {
  socket.emit('sendmsg', {from, to, content})
}

const recvMsg = function ({commit, state}) {
  socket.on('recvmsg', data => {
    console.log(data)
    commit(types.SET_MSG_LIST, data)
    // const msglist = [...state.msglist, data]
    // commit(types.SET_MSG_LIST, msglist)
    // const msgGroup = {}
    // msglist.forEach(v => {
    //   msgGroup[v.chatid] = msgGroup[v.chatid] || []
    //   msgGroup[v.chatid].push(v)
    // })
    // const chatList = Object.values(msgGroup)
    // commit(types.SET_CHAT_LIST, chatList)
  })
  commit(types.SET_SOCKET_ID, socket.id)
}

const _readMsg = function ({commit, state}, form) {
  readMsg({form}).then(res => {
    if (res.status === 200 && res.data.code === 0) {
      const msglist = state.msglist.map(v => ({...v, read: form === v.to ? true : v.read}))
      const msgGroup = {}
      msglist.forEach(v => {
        msgGroup[v.chatid] = msgGroup[v.chatid] || []
        msgGroup[v.chatid].push(v)
      })
      const chatList = Object.values(msgGroup)
      commit(types.SET_CHAT_LIST, chatList)
    }
  })
}

export {
  registerAccount,
  _updataUserInfo,
  _getUserInfo,
  userLogin,
  sendMsg,
  recvMsg,
  _readMsg,
  setuserid,
  userLogout,
  getSocket,
  tuling,
  chat,
  upload,
  relogin
}
