<template>
  <div>
    <div>message</div>
    <div>friends</div>
    <div>me</div>
  </div>
</template>

<script>
export default {
  name: 'bottomTab',
  data() {
    return {
      bottomNav: 'message'
    }
  },
  computed: {
    // 关于样式设置完全可以用覆盖的形式，这里只是没事找事罢了
    isActive() {
      let arr = ['message', 'friends', 'discover']
      let x = []
      x[arr.indexOf(this.bottomNav)] = true
      return x
    }
  },
  methods: {
    // 点击按钮
    handleChange(val) {
      this.bottomNav = val
      // 路由跳转至当前点击的页面
      this.$router.push(val)
      // 改变title
      this.$store.commit('changTitle', { title: val })
    }
  }
}
</script>

<style lang="stylus" scoped>
.bottom-tab
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>
