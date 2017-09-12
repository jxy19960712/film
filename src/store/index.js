import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isopen: true,
    searched: {
      state: false,
      content: ''
    }
  },
  mutations: {
    navbarClsOpe(state) {
      if (state.isopen == false) {
        state.isopen = true
      }
      else if (state.isopen == true) {
        state.isopen = false
      }
    },
    actionSearch(state, searchdata) {
      state.searched.state = searchdata.state;
      state.searched.content = searchdata.content;
      console.log(state.searched.content);
    }
  }
})
