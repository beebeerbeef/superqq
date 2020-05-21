import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/index'

Vue.use(VueRouter)

const Home = () => import ('views/Home')
const Register = () => import ('views/Register')
const Login = () => import ('views/Login')
const Message = () => import ('views/message/message')
const Friends = () => import ('views/friends/friends')
const User = () => import ('views/user/user')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      requireAuth: true, //表示进入这个路由时需要登录的
    }, 
    component: Message
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      requireAuth: true, //表示进入这个路由时需要登录的
    },
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
         // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
