import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO] (state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_COMMENT_LIST] (state, commentlist) {
    state.commentlist = commentlist
  },
  [types.SET_TITLE] (state, title) {
    state.title = title
  },
  [types.SET_MSG_LIST] (state, msglist) {
    state.msglist = msglist
  },
  [types.SET_SOCKET_ID] (state, socketid) {
    state.socketid = socketid
  },
  [types.SET_USER_ID] (state, userid) {
    state.userid = userid
  },
  [types.SET_SOCKET] (state, socket) {
    state.socket = socket
  },
  [types.SET_USER_AVATAR] (state, url) {
    state.useravatar = url
  },
  setuserid (state, userid) {
    state.userid = userid
  },
  showDialog (state) {
    // 判断当前动作是否是在打开对话，如果是在打开对话，那么进行判断当前当前进行对话的好友是否存在消息队列
    // 如果当前活跃的好友不存在消息队列（被删除的）那么就恢复此好友的消息队列，如果存在，那么无动作
    // if (!state.dialog) {
    //   // 空数组用来判断也是true，所以后面加个[0]
    //   let message = state.messageList.filter(x => x._id === state.activeId)[0]
    //   if (!message) {
    //     let oldMessage = state.messageListFB.filter(x => x._id === state.activeId)[0]
    //     state.messageList.splice(oldMessage._id - 1, 0, oldMessage)
    //   }
    // }
    state.mydialog = !state.mydialog
  }
}

export default mutations