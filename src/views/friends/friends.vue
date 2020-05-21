<template>
  <div class="register">
    <div class="register_container">
      <div class="logo">
        <img src="~views/login/logo.jpg" alt="">
      </div>
      <div class="base username">
        <input type="text"  placeholder="用户名" v-model="username" name="user_name">
      </div>
      <div class="base pssword">
        <input type="password"  placeholder="密码" v-model="password" name="password">
      </div>
      <div class="base repeatpssword">
        <input type="password"  placeholder="确认密码" v-model="repeatword" name="repeatword">
      </div>
      <div class="register" @click="handlerLogin">
        注册
      </div>
      <button @click="cors">hi CORS</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as axios from 'common/js/axios'
export default {
  data () {
    return {
      blurstate: false,
      username: '',
      password: '',
      repeatword: ''
    }
  },
  methods: {
    handlerBlur () {
      // console.log('获取焦点')
    },
    cors () {
      axios.get('koa')
    },
    handlerLogin () {
      // 注册
      let userinfo = {
        user_name: this.username,
        pwd: this.password
      }
      if (!this.username) {
        this.$toast({
          state: true,
          desc: '请输入用户名'
        })
        return
      }
      if (!this.password) {
        this.$toast({
          state: true,
          desc: '请输入密码'
        })
        return
      }
      if (!this.repeatword) {
        this.$toast({
          state: true,
          desc: '请确认密码'
        })
        return
      }
      if (this.password === this.repeatword) {
        this.registerAccount({userinfo}).then(res => {
          if (res.data.code === 200) {
            this.$router.push({path: '/userinfo'})
          }
        })
      } else {
        this.$toast({
          state: true,
          desc: '两次密码不一致',
          duration: 2000
        })
      }
    },
    ...mapActions([
      'registerAccount'
    ])
  }
}
</script>

<style lang='stylus' scoped>

</style>