const initialState = () => {
  return {
    filter: {
      first: 6,
      skip: 0,
      title: ''
    }
  }
}
const state = initialState()

const mutations = {
  SET_FILTER (state, payload) {
    state.filter = Object.assign({}, state.filter, payload)
  },
  RESET_EVENT_STATE (state) {
    /*
          FUNCTION:
          RESET TO INITIAL STATE. YOU WILL APPRECIATE THIS FUNCTIONALITY
          WHEN YOU ALREADY DEALING WITH COOKIE / LOCAL STORAGE
        */
    Object.assign(state, initialState())
  }
}

const getters = {
  filter: state => state.filter
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
