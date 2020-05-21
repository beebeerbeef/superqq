<template>
  <el-main class="dialog">
    <div id='back' >
      <button icon="el-icon-arrow-left" @click="dialog">返回</button>
    </div>
    
    <!--对话内容-->
    <div class="dialogue">
      <div class="patch-1"></div>
      <my-dialogue/>
      <div class="patch-2"></div>
      <!--锚点-->
    </div>
    <el-input placeholder="请输入内容" v-model="value" class="input-with-select" @keyup.enter.native="sendMsg2">
      <el-button slot="append" icon="el-icon-arrow-right" @click="sendMsg2"></el-button>
    </el-input>
  </el-main>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import myDialogue from './avatar'

export default {
  name: 'mydialog',
  components: {
    myDialogue
  },
  data() {
    return {
      value: '',
      timer: {}
    }
  },
  computed: {

  },
  methods: {
    sendMsg2 () {
      let content = this.value
      let from = this.$store.state.userid
      let to = 0 
      if (content){
        this.tuling({from, to, content})
      } else {
        console.log('输入不能为空')
      }
      this.value = ''
    },
    getChat() {
      let userinfo = this.$store.state.userid
      this.chat({userinfo})
    },
    dialog() {
      this.$store.commit('showDialog')
    },
    ...mapActions([
      // 'recvMsg',
      // 'sendMsg',
      '_getUserInfo',
      'tuling',
      'chat'
    ])
}
}
</script>
<style lang="scss" scoped>
.dialog{
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 0 0 0;
  background: #f4f4f6;
}
.dialogue{
  padding-bottom: 60px;
  margin-top: 60px;
}
.input-with-select{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-right: 10px;
}
#back{
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background: #f6f6f6;
  color: black;
  z-index: 1;
}
</style>
