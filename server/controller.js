const user = require('./user')
const Base64 = require('js-base64').Base64

async function checkLogin(ctx, next) {
  let {user_name, pwd} = ctx.request.body.userinfo
  let data = await user.checkUser(user_name, pwd)
  ctx.response.body = data
}

async function registerUser(ctx, next) {
  let {user_name, pwd} = ctx.request.body.userinfo
  console.log(ctx.request.body.userinfo)
  let data = await user.findUser(user_name, pwd) 
  ctx.response.body = data
}

async function getUserInfo(ctx, next) {
  let {userid, socketid} = ctx.request.body.userinfo
  console.log({userid, socketid})
  let data = await user.getUserInfo(userid, socketid)
  ctx.response.body = data
}
async function reLogin(ctx, next) {
	let s = Base64.decode(ctx.request.body.token.split('.')[1])
	let token = JSON.parse(s)
	let data = await user.checkUser(token.userid, token.password)
	ctx.response.body = data
}
async function handlerMsg(data) {
	let socketid = await user.sendMsg(data)
	return socketid
}

async function getMsg(data) {
	let msgList = await user.getMsg(data)
	return msgList
}

async function confirm(data) {
	let state = await user.confirm(data)
	return state
}

async function upAvatar(userid, url) {
	let state = await user.upAvatar(userid, url)
	return state
}

async function logout(ctx, next) {
	let userid = ctx.request.body.userinfo
	let data = await user.logout(userid)
	ctx.response.body = data
}

async function addChat(ctx, next) {
	console.log(ctx.request.body)
	let params = ctx.request.body.msg
	let data = await user.addChat(params)
	ctx.response.body = data
}

async function msgList(ctx, next) {
	let params = ctx.request.body.userinfo
	let data = await user.msgList(params)
	ctx.response.body = data
}

module.exports = {
	checkLogin,
	registerUser,
	getUserInfo,
  handlerMsg,
  logout,
  confirm,
  getMsg,
  addChat,
  msgList,
  upAvatar,
  reLogin
}