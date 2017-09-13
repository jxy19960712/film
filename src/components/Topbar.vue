<template>
  <div class="mdui-toolbar mdui-color-topbar">
    <a href="javascript:;" class="mdui-btn mdui-btn-icon" @click="ocToggle">
      <i class="mdui-icon material-icons">menu</i>
    </a>
    <span class="mdui-typo-title">FILM</span>
    <div class="mdui-toolbar-spacer"></div>
    <input class="mdui-textfield-input topSearch" type="search" placeholder="搜索影片..."
           v-model="centerSearchtext"
           @keyup.enter="searching"
    >
    <a href="javascript:;" class="mdui-btn mdui-btn-icon"
       @click.preventDefault="searching"
    >
      <i class="mdui-icon material-icons">search</i>
    </a>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //绑定center搜索框值
        centerSearchtext: ''
      }
    },
    methods: {
      ocToggle() {
        //改变nav栏打开或关闭状态
        this.$store.commit('navbarClsOpe')
      },
      searching() {
        //改变状态中acntionSearch的值,并传递搜索框值
        this.$store.commit('actionSearch', {state: true, content: this.centerSearchtext})
        //跳转list页面
        this.$router.push('/list')
        this.centerSearchtext = ''
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

  .mdui-color-topbar {
    background-color: #333;
    color: #fff;
    position: fixed;
    top: 0;
    z-index: 3;
  }

  .topSearch {
    width: 2rem;
    height: 30px;
    background-color: #f2f2f2;
    color: #333;
    border-radius: 0.5rem;
    text-indent: 1em;
    margin: 0;
  }

  @media screen  and (max-width: 768px) {
    .mdui-typo-title {
      margin: 0;
    }
  }

</style>
