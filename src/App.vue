<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div> -->
    <top-nav></top-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <bottom-bar></bottom-bar>
    <my-dialog class="my-dialog"
               v-if="mydialog"></my-dialog>
    <!--个人主页
    <my-personindex class="my-personindex"
                    v-if="personindex"></my-personindex>
    -->
    <!--搜索-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import topNav from 'views/topnav/top-nav'
import bottomBar from 'components/content/mainTabbar/MainTabBar'
import myDialog from 'components/dialog/dialog'


export default {
  name: 'app',
  components: {
    bottomBar,
    topNav,
    myDialog
    // mySidebar,
    // myPersonindex,
    // mySearch
  },
  computed: mapState(['mydialog']),
  methods: {
  },
  updated() {
    if(this.mydialog){
      document.querySelector(".dialog").scroll(0, 10000000)
    }
  },
  created() {
    // let token = localStorage.getItem('token')
    // if (token) {
    //   this.$store.dispatch('relogin', {token}).then(res => {
    //     console.log(res)
    //   })
    // }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.my-dialog{
  position: absolute;
}

</style>
