<template>
  <div class="top-wrap">
    <div>
      <div></div>
      <div>
        <div class="cap">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'topNav',
  computed: mapState({
    title: state => state.title
    // headerTitle: 'headerTitle'
  }),
  methods: {
    logout() {
      let userinfo = this.$store.state.userid
      this.userLogout({userinfo})
    },
    ...mapMutations(['SET_TITLE']),
    ...mapActions(['userLogout'])
}
}
</script>

<style scoped>
  .cap{
    text-transform: capitalize;
  }
</style>

