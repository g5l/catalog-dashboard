import Vue from 'vue'
import Vuex from 'vuex'
import company from './modules/company'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    company,
    user
  },
})