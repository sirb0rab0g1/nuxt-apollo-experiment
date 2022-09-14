const initialState = () => {
  return {
    sample: {}
  }
}

const state = () => {
  return initialState()
}

const mutations = {
  SET_SAMPLE (state, payload) {
    state.navigation = payload
  },
  RESET_NAVIGATION_STATE (state) {
    /*
      FUNCTION:
      RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
      WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
    */
    Object.assign(state, initialState())
  }
}

const getters = {
  sample: state => state.sample
}

const actions = {
  CHANGE_SAMPLE ({ commit }, payload) {
    commit('SET_SAMPLE', payload)
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
