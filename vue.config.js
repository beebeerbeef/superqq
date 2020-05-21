module.exports = {
  configureWebpack: {
  	resolve: {
  		alias: {
  			'assets': '@/assets',
  			'common': '@/common',
  			'components': '@/components',
  			'views': '@/views',
        'api': '@/api',
        'store': '@/store'
  		}
  	}
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "0.0.0.0", //将localhost改为0.0.0.0 可解决手机不能访问问题
    port: '8081',
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        '^/api': ''
        }
      },
      '/upload': {
        target: 'http://localhost:3002', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/upload/aaa/ccc'重写为'/aaa/ccc'
        '^/upload': ''
        }
      },
      '/tuling': {
        target: 'http://openapi.tuling123.com/openapi/api/v2',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tuling': ''
        }
      }
    }
  }
}