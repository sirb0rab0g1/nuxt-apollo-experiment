import Vue from 'vue'
import Vuex from 'vuex'

import sample from './modules/sample'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    modules: {
      sample
    }
  })
}

export default store
