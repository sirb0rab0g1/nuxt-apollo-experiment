const initialState = () => {
  return {
    filter: {
      first: 10,
      skip: 0,
      title: ''
    },
    filterhistory: []
  }
}

const state = () => {
  return initialState()
}

const mutations = {
  SET_FILTER (state, payload) {
    state.filter = Object.assign({}, state.filter, payload)
  },
  SET_NEW_FILTER_HISTORY (state, payload) {
    state.filterhistory.push(payload)
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
  filter: state => state.filter,
  filterhistory: state => state.filterhistory
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
