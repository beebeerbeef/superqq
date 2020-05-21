<template>
  <div class="home">
  	<topnav></topnav>
    <img alt="Vue logo" src="../assets/logo.png">
    <router-view></router-view>
    <bottombar></bottombar>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import topnav from 'views/topnav/top-nav'
import bottombar from 'views/bottombar/bottom-bar'

export default {
  name: 'home'
}
</script>
