<template>
<transition name="fade">
  <div class="toastplugins" v-if="state">
    <div class="toastcontainer">
      <p>{{desc}}</p>
    </div>
  </div>
</transition>
</template>

<script>
  export default {
    data () {
      return {
        state: false,
        desc: '',
        duration: 1000
      }
    },
    created () {
      let timer = setTimeout(() => {
        this.state = false
        clearTimeout(timer)
      }, this.duration)
    }
  }
</script>

<style lang="stylus" scoped>
 
</style>
