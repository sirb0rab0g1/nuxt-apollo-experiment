import moment from 'moment'
import Vue from 'vue'

Vue.filter('monthdayyear', date => moment(date).local().format('MMMM D, YYYY'))

Vue.filter('monthyear', date => moment(date).local().format('MMMM YYYY'))

Vue.filter('monthday', date => moment(date).local().format('MMM Do'))

Vue.filter('datetime', date => moment(date).local().format('MMMM D, YYYY HH:mm A'))
