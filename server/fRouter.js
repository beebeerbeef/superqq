// const koa = require('koa')
const Router = require('koa-router')
const uploadimg = require('./fUpload')
const controller = require('./controller')
// const app = new koa()
const router = new Router({

})

router
	.get('/', (ctx, next) => {
		ctx.body = "Index page"
	})
	.get('/koa', (ctx, next) => {
		ctx.body = "Koa page"
	})
	.post('/uploadImg', async function(ctx, next) {
  const imgUrl = await uploadimg(ctx)
  const state = await controller.upAvatar(ctx.request.body.userid, imgUrl)
  if (imgUrl && state) {
    ctx.body = {
      data: imgUrl,
      message: '文件上传成功',
      code: '0',
    }
  } else {
    ctx.body = {
      data: imgUrl,
      message: '文件上传失败',
      code: '1',
    }
  }
  
})


module.exports = router