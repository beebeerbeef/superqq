<template>
  <tab-bar>
    <tab-bar-item link="/message">
      <img slot="icon" src="~assets/img/tabbar/message.svg" alt="">
      <img slot="active-icon" src="~assets/img/tabbar/message_active.svg" alt="">
      <div slot="text">消息</div>
    </tab-bar-item>
    <!-- <tab-bar-item link="/friends">
      <img slot="icon" src="~assets/img/tabbar/friends.svg" alt="">
      <img slot="active-icon" src="~assets/img/tabbar/friends_active.svg" alt="">
      <div slot="text">联系人</div>
    </tab-bar-item> -->
    <tab-bar-item link="/user">
      <img slot="icon" src="~assets/img/tabbar/user.svg" alt="">
      <img slot="active-icon" src="~assets/img/tabbar/user_active.svg" alt="">
      <div slot="text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

  <script>
    import TabBar from 'components/common/tabbar/TabBar'
    import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
      name: "MainTabBar",
      components: {
        TabBar, TabBarItem
      }
    }
  </script>

<style scoped>

</style>
