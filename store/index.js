import Vue from 'vue'
import Vuex from 'vuex'

import events from './modules/events'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      events
    }
  })
}

export default store
