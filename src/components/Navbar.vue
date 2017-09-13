<template>
  <div class="mdui-drawer mdui-color-navbar" id="drawer"
       :class="{
             'mdui-drawer-close':changeOpen,
             'mdui-drawer-open':!changeOpen
             }"
       overlay="true"
  >
    <ul class="mdui-list navbarList">
      <router-link to="/" tag="li" class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">home</i>
        <div class="mdui-list-item-content">首页</div>
      </router-link>
      <router-link to="/list" tag="li" class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">subscriptions</i>
        <div class="mdui-list-item-content">新片推荐</div>
      </router-link>
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">move_to_inbox</i>
        <div class="mdui-list-item-content">下载记录</div>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">star</i>
        <div class="mdui-list-item-content">收藏影片</div>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
        <div class="mdui-list-item-content">我的消息</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {
      //侧边栏展开关闭的判断值
      changeOpen() {
        return this.$store.state.isopen
      }
    }
  }
</script>
<style scoped>
  /*<style>*/
  html {
    font-size: 100px;
    height: 100%;
  }

  .mdui-drawer {
    margin-top: 56px;
    background-color: #fff;
  }
</style>

<!--mdui-drawer-close-->
