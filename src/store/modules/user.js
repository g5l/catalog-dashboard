import { me } from '@/api/user'

const state = () => ({
  user: {}
})

const getters = {
  isUserEmpty: state => {
    return Object.keys(state.user).length <= 0
  },
}

const actions = {
  async fetchUser({ commit }) {
    const { data } = await me()
    commit('addUser', data.user)
  }
}

const mutations = {
  addUser (state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}