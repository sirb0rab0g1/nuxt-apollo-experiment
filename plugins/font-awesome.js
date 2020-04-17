/* eslint-disable */

import Vue from 'vue'
// the component
import fontawesome from '@fortawesome/fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import faFacebookSquare from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

fontawesome.library.add(faFacebookSquare)

Vue.component('font-awesome-icon', FontAwesomeIcon)
