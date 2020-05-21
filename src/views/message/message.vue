<template>
  <div class="login">
    <div class="login_container">
      <div style="margin-top: 15px;">
        <!-- <el-input placeholder="请输入内容" v-model="inputmsg" class="input-with-select">
          <el-button slot="append" icon="el-icon-arrow-right" @click="sendMsg1"></el-button>
        </el-input> -->
        <el-button :plain="true" @click="getChat">获取聊天记录</el-button>
        <el-button :plain="true" @click="dialog">打开聊天框</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { getsocket, getsocketid, sendMsg, recvMsg} from '@/network/socket'
export default {
  data () {
    return {
      inputmsg: '',
      socketid: this.$store.state.socketid,
    }
  },
  methods: {
    // sendMsg1 () {
    //   sendMsg({from:'1', to:'2', content:this.inputmsg})
    // },
    getChat() {
      let userinfo = this.$store.state.userid
      this.chat({userinfo})
    },
    dialog() {
      this.showDialog()
    },
    ...mapMutations([
      'showDialog'
      ]),
    ...mapActions([
      // 'recvMsg',
      // 'sendMsg',
      'chat'
    ])
  },
  created() {
    console.log('开始')
    getsocket()
    recvMsg()
  },
  mounted() {
    setTimeout(()=>{
      let socketid = getsocketid()
      this.$store.commit('SET_SOCKET_ID', socketid)
      let userid = this.$store.state.userid
      // this._getUserInfo({userid, socketid})
      // console.log({userid, socketid})
    },500)
    
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
