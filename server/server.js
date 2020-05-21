const koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const reshandler = require('koa-response-handler')
const koaStatic = require('koa-static')
const path = require('path')
const userRouter = require('./router')
const fRouter = require('./fRouter')
const controller = require('./controller')
const user = require('./user')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const app = new koa()
const fapp = new koa()
const fServer = require('http').Server(fapp.callback())
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

app
	.use(function (ctx, next) {
  	if (ctx.url != '/user/login' && ctx.url != '/user/register' && ctx.url != '/user/relogin') {
  		let token = ctx.header.authorization
  		let result = verifyToken(token)
  		if (result.userid) {
  			return next()
  		} 
  		if(result.expiredAt){
  			ctx.status = 403
  			ctx.body = { msg: '登录已过期，请重新登录'}
  		} else {
  			ctx.status = 403
  			ctx.body = { msg: 'token不匹配'}
  		}
  	} else {
  		return next()
  	}
  })
  .use(function(ctx, next){
	  return next().catch((err) => {
	  	console.log(err)
	    if (404 == err.status) {
	      ctx.status = 404
	      ctx.body = 'Protected resource, use Authorization header to get access\n'
	    } else {
	      throw err
	    }
	  })
	})
  .use(reshandler({ contentType: 'application/json' }))
  .use(bodyparser())
  .use(userRouter.allowedMethods())
  .use(userRouter.routes())
  

server.listen(3001, () => {
	console.log('starting at port 3001')
})

fapp
  .use(koaBody({
		multipart: true, //支持文件上传
		encoding: 'gzip',
		formidable: {
			uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
	    keepExtensions: true,    // 保持文件的后缀
	    maxFieldsSize:10 * 1024 * 1024, // 文件上传大小，默认2M
	    onFileBegin:(name,file) => { // 文件上传前的设置
	    	const dir = path.join(__dirname,'public/upload/')
	    	let arr = file.name.split('.')
	    	const ext = arr[arr.length - 1]
	    	const fname = `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`
	    	file.name = fname
	    	file.path = `${dir}/${fname}`
	    }
		}
	}))
	.use(koaStatic(
		path.join(__dirname,'public/upload/')
	))
	.use(fRouter.routes())

fServer.listen(3002, () => {

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

function verifyToken(token) {
	let cert = fs.readFileSync('./pub.key')
	let res
	jwt.verify(token, cert, (err, decode) => {
		if(err) {
			res = err
		} else {
			res = decode
		}
	})
	return res
}