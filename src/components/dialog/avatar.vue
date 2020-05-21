<template>
  <div>
    <div class="dialogue"
       v-for="item of msglist">
      <el-main>
        <div class="lavatar" v-show="item.from == 0">
          <el-avatar :src="robot" :size="52" fit="fill" id="aleft"></el-avatar>
          <span style="margin-right:70px;">{{item.content}}</span>
        </div>
        <div class="ravatar" v-show="item.from != 0">
          <span class="before"></span>
          <span style="margin-left:65px;">{{item.content}}</span>
          <el-avatar :src="getAvatar" :size="52" fit="fill"></el-avatar>
        </div>
      </el-main>
    </div>
  
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'avatar',
  computed: {
    ...mapGetters(['getAvatar','msglist']),
    robot() {
      return 'http://localhost:3002/avatar3.jpg'
    }
  },
  updated() {
    document.querySelector(".dialog").scroll(0, 10000000)
    let clientWidth = document.body.clientWidth - 200 + 'px'
    document.getElementsByTagName('span').setAttribute('max-width', clientWidth)
  }
}
</script>
<style lang="scss" scoped>
.ravatar{
  display: flex;

}
.lavatar{
  display: flex;
}
.dialogue{
  margin-top: 10px;
  font-size: 16px;
  background: #f4f4f6;
  display: block;
  position: relative;
}
span{
  color: rgba(0,0,0,0.9);
  display: inline-block;
  padding: 1.5vh;
  background: white;
  text-align: left;

}
.before{
  visibility: hidden;
  flex: 1;
  max-width: 100%;
}
.el-avatar{
  padding: 0;
  margin-left: 20px;
}
#aleft{
  margin-right: 20px;
}
</style>
