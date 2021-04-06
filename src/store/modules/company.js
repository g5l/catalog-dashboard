import { fetchMyCompany, fetchCompanySlug } from '@/api/company'

const state = () => ({
  company: {},
  profile: {}
})

const getters = {
  isCompanyEmpty: state => {
    return Object.keys(state.company).length <= 0
  },
  logo: state => state.company.logo,
  name: state => state.company.name,
  slug: state => state.company.slug,
  companyData: state => state.company,
  profile: state => state.profile
}

const actions = {
  async fetchCompany({ commit }) {
    const { data } = await fetchMyCompany()
    const { data: profile } = await fetchCompanySlug(data.slug)

    delete data.User

    commit('addCompany', data)
    commit('addProfile', profile.Profile)
  }
}

const mutations = {
  addCompany (state, company) {
    state.company = company
  },
  addProfile (state, profile) {
    state.profile = profile
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}