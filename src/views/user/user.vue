<template>
  <div class="register">
    <div>

      <el-upload
        class="avatar-uploader"
        action="/upload/uploadImg"
        :data="userid"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img :src="getAvatar" alt='头像' class="avatar">
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </div>
    <!-- <el-button :plain="true" @click="alter">修改密码</el-button> -->
    <el-button :plain="true" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getAvatar','getUserId']),
    userid() {
      let userid = this.getUserId
      return {userid}
    }
  },
  methods: {
    logout() {
      let userinfo = this.$store.state.userid
      this.userLogout({userinfo})
      localStorage.removeItem('token')
      this.$router.push({path: '/login'})
    },
    handleAvatarSuccess(res, file) {
      this.$store.commit('SET_USER_AVATAR', res.data)
      console.log('上传成功')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    alter() {

    },
    ...mapActions(['userLogout'])
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