import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading, Toast } from '@/Plugins/index'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import * as filters from 'common/js/filter'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Loading)
Vue.use(Toast)

// 引入过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 设置默认打开的页面
router.replace('login')
