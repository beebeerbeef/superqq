// const koa = require('koa')
const Router = require('koa-router')
const sequelize = require('./db')
const account = sequelize.model('account')
const utility = require('utility')
const controller = require('./controller')
// const app = new koa()
const router = new Router({
		prefix: '/user'
})

router
	.get('/', (ctx, next) => {
		ctx.body = "Index page"
	})
	.get('/koa', (ctx, next) => {
		ctx.body = "Koa page"
	})
	.post('/register', controller.registerUser)
	.post('/login', controller.checkLogin)
	.post('/logout', controller.logout)
	.post('/getUserInfo', controller.getUserInfo)
	.post('/addChat', controller.addChat)
	.post('/msgList', controller.msgList)
	.post('/relogin', controller.reLogin)


module.exports = router