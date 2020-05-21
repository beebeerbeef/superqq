<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">
        <img src="./logo.jpg" alt="">
      </div>
      <div class="base username">
        <input type="text" placeholder="用户名" v-model="user_name">
      </div>
      <div class="base pssword">
        <input type="password" placeholder="密码" v-model="pwd">
      </div>
      <div class="login">
        <p @click="handlerLogin">登录</p>
        <p @click="toRgister">注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      blurstate: false,
      user_name: '',
      pwd: ''
    }
  },
  methods: {
    handlerLogin () {
      if (!this.user_name) {
        this.$toast({
          state: true,
          desc: '请输入用户名'
        })
        return
      }
      if (!this.pwd) {
        this.$toast({
          state: true,
          desc: '请输入密码'
        })
        return
      }
      let userinfo = {
        user_name: this.user_name,
        pwd: this.pwd
      }
      this.userLogin({userinfo}).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          this.$router.push({path: '/'})
        }
      })
    },
    toRgister () {
      this.$router.push({path: '/register'})
    },
    ...mapActions([
      'userLogin'
    ])
  }
}
</script>

<style scoped>
  .logo{
    width:100px;
    height:100px;
    overflow:hidden;
    margin:0 auto;
    border-radius:100%;
    margin-bottom:50px;
    margin-top:100px;
  }
</style>
