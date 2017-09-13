<template>
  <div class="container">
    <topbar></topbar>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import topbar from './components/Topbar.vue'
  import navbar from './components/Navbar.vue'

  export default {
    components: {
      topbar,
      navbar
    }
  }
</script>

<style>



  html {
    font-size: 100px;
    height: 100%;
  }

  body {
    height: 100%;
  }

  @font-face {
    font-family: myfont;
    src: url('./assets/font/TotalEclipse.ttf');
  }

  .container {
    height: 100%;
  }
</style>
