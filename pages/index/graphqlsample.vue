<template>
<div>
  <v-card>
    <no-ssr>
      <v-flex xs12 sm6 md3>
        <v-text-field
          label="Search"
          v-model="gosearch"
          @keyup.enter="search"
        ></v-text-field>
      </v-flex>
      <v-container
        id="scroll-target"
        class="scroll-y">
        <v-layout
          v-scroll:#scroll-target="onScroll"
          style="min-height: 320px; max-height: 320px;"> 
            <ul>
              <li v-for="(item, index) in result">
                {{ item }}
                <v-btn @click="choose(item)">choose</v-btn>
                <v-btn @click="remove(item)">remove</v-btn>
              </li>
            </ul>
        </v-layout>
      </v-container>
    </no-ssr>
  </v-card>

  <v-btn @click="goTo('/editevent')"> CREATE EVENT </v-btn>
</div>
</template>

<script>
/* eslint-disable */
import {
  FETCH_EVENTS,
  CREATE_UPDATE_EVENT,
  DELETE_EVENT
} from '~/plugins/mixins/queries/events'
import Global from '~/plugins/mixins/global'
import Constants from '~/plugins/mixins/constants'
import EventApollo from '~/plugins/mixins/apollo/event_apollo'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    result: [],
    events: {},
    gosearch: ''
  }),
  mixins: [
    Constants,
    Global,
    EventApollo
  ],
  computed: {
    ...mapGetters('events', ['filterhistory'])
  },
  methods: {
    ...mapMutations('events', ['SET_NEW_FILTER_HISTORY', 'RESET_EVENT_STATE']),
    search () {
      this.result = []
      this.filter = {first: 6, skip: 0}
      this.$set(this.filter, 'title', this.gosearch)
      this.get()
    },
    get () {
      let query = FETCH_EVENTS
      let find = _.find(this.filterhistory, this.filter)
      if (_.isUndefined(find)) {
        this.SET_NEW_FILTER_HISTORY(this.filter)
      }
      this.$apollo.query({
        query: query,
        variables: this.filter
      }).then(data => {
        for (let item of data.data.all_events.edges) {
          this.result.push(item) // data reactive
        }
      })
    },
    choose (item) {
      this.goTo(`/editevent/${item.node.id}`)   
    },
    async remove () {
      this.$apollo.mutate({
        mutation: DELETE_EVENT,
        variables: this.events,
      }).then(data => {
        console.log(data)
      }).catch(data => {
        console.log(data)
      })
    },
    onScroll (e) {
      let target = e.target
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
        this.filter.skip += 6
        this.get()
        target.scrollTop = (target.scrollTop - 20)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.RESET_EVENT_STATE()
      vm.get()
    })
  }
}
</script>
