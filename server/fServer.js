const koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const reshandler = require('koa-response-handler')
const userRouter = require('./router')
const controller = require('./controller')
const app = new koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

app
  .use(reshandler({ contentType: 'application/json' }))
  .use(bodyparser())
  .use(userRouter.allowedMethods())
  .use(userRouter.routes())

server.listen(3001, () => {
	console.log('starting at port 3001')
})


io.on('connection', socket => {
	console.log('初始化成功！下面可以用socket绑定事件和触发事件了')
	socket.on('sendmsg', data => {
		console.log('客户端发送的内容：', data)
		socket.emit('recvmsg','我是返回的消息')
		let socketid = controller.handlerMsg(data)
		socketid.then(res => {
				io.to(res).emit('recvmsg', data.content)
		})
	})
	socket.on('confirm', data => {
		controller.confirm(data).then(res => {
			console.log('消息确认收到 ')
		})
	})
	//根据sockeid返回聊天记录
	// setTimeout(()=>{
	// 	controller.getMsg(socket.id).then(res => {
	// 		socket.emit('recvmsg', res)
	// 	})
	// },1000)
})

