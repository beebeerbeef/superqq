<template>
  <div class="login">
    <div class="login_container">
      <div class="logo">
        <img src="~views/login/logo.jpg" alt="" width="200px" height="200px">
      </div>
      <div class="base username">
        <input type="text" placeholder="用户名" v-model="user_name">
      </div>
      <div class="base pssword">
        <input type="password" placeholder="密码" v-model="pwd">
      </div>
      <div class="login">
        <el-button @click="handlerLogin">登录</el-button>
        <el-button @click="toRgister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { getsocket, sendMsg, recvMsg} from '@/network/socket'
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
          localStorage.setItem('token', res.data.token)
          this.$router.push({path: '/message'})
          this.$store.commit('SET_USER_ID', this.user_name)
          this.$store.commit('SET_USER_AVATAR', res.data.url)
          this.user_name = ''
          this.pwd = ''
          // let userid = this.$store.state.userid
          // let socketid = this.$store.state.socketid
          // this._getUserInfo({userid, socketid})
        }
      })
    },
    toRgister () {
      this.$router.push({path: '/register'})
    },
    created () {
      // this.recvMsg()
    },
    ...mapActions([
      'userLogin',
      '_getUserInfo',
      'recvMsg',
      'getSocket'
    ])
  }
}
</script>

<style scoped>
.login{
	margin-top: 10px;
}
</style>
