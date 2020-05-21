const sequelize = require('./db')
const account = sequelize.model('account')
const chat = sequelize.model('chat')
const tlchat = sequelize.model('tlchat')
const utility = require('utility')
const Op = require('sequelize').Op
const jwt = require('jsonwebtoken')
const fs = require('fs')

// const app = new koa()

async function checkUser(userid, password) {
	return account.findOne({'where': {'user_name': userid, 'pwd': pwdMd5(password)}}).then(doc => {
		if (doc) {
			let content = {userid, password}
			let secretOrPrivateKey = fs.readFileSync('./pri.key')// 这是公钥
			let token = jwt.sign(content, secretOrPrivateKey, { algorithm: 'RS256', expiresIn: 900 //15min过期
			})
			account.update({token: token},{where: {user_name: userid}})
			// account.update({online: true},{where: {user_name: userid}})
			return account.findOne({where: {user_name: userid}}).then(res => {
				return { msg: "登录成功", code: 200, url: res.avatar, token: token}
			})
		} else {
			return { msg: "登录失败", code: 201 }
		}
	})
}

async function addChat(data) {
	console.log(data)
	return tlchat.create(data).then(doc => {
		if (doc._options.isNewRecord === true) {
			return tlchat.findOne({where: data}).then(res => {
				if(res) {
					return { msg: "记录成功", code: 200, time: res.createdAt}
				} else {
					return { msg: '记录失败', code: 201}
				}
			})
		}
	})
}

async function logout(userid) {
	return account.update({online: false},{where: {user_name: userid}}).then(doc => {
		return { msg: "注销用户成功", code: 200}
	})
}

async function upAvatar(userid, url) {
	return account.update({avatar: url},{where: {user_name: userid}}).then(doc => {
		console.log(doc)
		if (doc) {
			return true
		} else {
			return false
		}
	})
}

async function sendMsg(data) {
	return account.findOne({where: {user_name: data.to}}).then(doc => {
		chat.create(data)
		if(doc.online) {
			return doc.socketid
		} else {

		}		
	})
}

async function getMsg(data) {
	return account.findOne({where: {socketid: data}}).then(doc => {
		if(doc){
			let userid = doc.user_name
			return msgList(userid)
		} else{
			console.log(data)
		}
	})
}

async function msgList(data) {
	return tlchat.findAll({where: {[Op.or]: [{from: data},{to: data}]}}, {order: ['created_at', 'DESC']}).then(doc => {
		return doc
	})
}

async function confirm(data) {
	return chat.update({received: true},{where: {}})
}

async function findUser(userid, password) {
	return account.findOne({where: {user_name: userid}}).then(doc => {
		if(!doc) {
      const data = {
	      user_name: userid,
	      pwd: pwdMd5(password),
	      user_id: pwdMd5(Date.now())
	    }
			return registerUser(data)
		} else {
			return { msg: "用户已存在", code: 202 }
		}
	})
}
async function getUserInfo(userid, socketid) {
	return account.findOne({where: {user_name: userid}}).then(doc => {
		account.update({socketid: socketid},{where: {user_name: userid}})
		if(doc) {
			return {userinfo:doc.socketid, code: 200}
		}
	})
}

function getSocketId(userid) {
	return account.findOne({where: {user_name: userid}}).then(doc => {
		if(doc) {
			return doc.doc.socketid
		}
	})
}

async function registerUser(data) {
	return account.create(data).then(doc => {
		if (doc._options.isNewRecord === true) {
		return { msg: "注册成功", code: 200 }
		} else {
		return { msg: "注册失败", code: 200 }
		}
	})
}  


function pwdMd5(pwd) {
  const salt = 'Ethan_is_man_56good#@!45$sss$453%^&9**~~~~``'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
 checkUser,
 findUser,
 registerUser,
 getUserInfo,
 getSocketId,
 sendMsg,
 logout,
 getMsg,
 addChat,
 msgList,
 upAvatar
}