import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import 'mdui/dist/css/mdui.min.css'
import 'mdui/dist/js/mdui.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



