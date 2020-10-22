import { fetchMyCompany } from '@/api/company'

const state = () => ({
  company: {}
})

const getters = {
  isCompanyEmpty: state => {
    return Object.keys(state.company).length <= 0
  },
  logo: state => state.company.logo,
  name: state => state.company.name
}

const actions = {
  async fetchCompany({ commit }) {
    const { data } = await fetchMyCompany()
    delete data.User
    commit('addCompany', data)
  }
}

const mutations = {
  addCompany (state, company) {
    state.company = company
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}