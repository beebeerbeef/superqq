<template>
  <div>
    <div class="dialogue"
         v-for="item of msglist">
      <div>
        <my-avatar :src="item._id===0?userData.self.avatar:userData.friend.avatar"
                   :slot="item._id===0?'rightAvatar':'leftAvatar'"/>
        <span :slot="item._id===0?'after':'title'">
                    <span class="content" style="color: rgba(0, 0, 0, .9)">{{item.message}}</span>
        </span>
      </div>
    </div>
  
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import myAvatar from './avatar'
export default {
  name: 'dialogue',
  props: ['userData'],
  computed: {
    ...mapGetters(['msglist'])
  },
  updated() {
    this.$emit('scrollC')
  }
}
</script>
<style lang="scss" scoped>
.dialogue{
  margin-top: 10px;
  font-size: 16px;
  background: gray;
}
.content{
  display: inline-block;
  padding: 1.5vh;
  background: #fff; 
}
  
</style>
