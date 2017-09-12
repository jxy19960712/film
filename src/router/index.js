import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import movielist from '../components/Movielist.vue'
import detail from '../components/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: index},
    {path:'/list',component:movielist},
    {path:'/detail',component:detail}
  ]
})
