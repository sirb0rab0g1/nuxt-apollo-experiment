<template>
<div>
  <v-card>
    <no-ssr>
      <v-flex xs12 sm6 md3>
        <v-text-field
          label="Search"
          v-model="gosearch"
          @keyup.enter="get"
        ></v-text-field>
      </v-flex>
      <v-container
        id="scroll-target"
        class="scroll-y">
        <v-layout
          v-scroll:#scroll-target="onScroll"
          style="min-height: 100px; max-height: 320px;"> 
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

  {{ filter }}
  {{ result.length }}
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
import EventApollo from '~/plugins/mixins/apollo/event_apollo'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    result: [],
    events: {},
    gosearch: ''
    /* customSkip: 0,
    somethingfilter: {
      first: 6
    } */
  }),
  mixins: [Global, EventApollo],
  computed: {
    ...mapGetters('events', ['filter'])
  },
  methods: {
    ...mapMutations('events', ['SET_FILTER']),
    search () {
      /* this.customSkip = 0
      this.$set(this.filter, 'skip', this.customSkip)
      this.$set(this.filter, 'title', this.gosearch)
      let query = FETCH_EVENTS
      this.$apollo.query({
        query: query,
        variables: this.filter,
        update: (store, { data: { CreateUpdateEvent } }) => {
          const todoQuery = {
            query: FETCH_EVENTS,
            variables: this.filter
          }
          let payload = {
            node: CreateUpdateEvent.event
          }
          const todoData = store.readQuery(todoQuery)
          todoData.all_events.edges = payload 
          store.writeQuery({ ...todoQuery, data: payload })
        }
      }).then(data => {
        this.result = data.data.all_events.edges
      }) */
    },
    get () {
      let query = FETCH_EVENTS
      // this.$set(this.filter, 'skip', this.filter.ski)
      this.$set(this.filter, 'title', this.gosearch)
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
    onScroll (e) { // lazy load purpose
      let target = e.target
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
        this.$set(this.filter, 'skip', this.filter.skip += 6)
        this.SET_FILTER(this.filter)
        // this.customSkip += 6
        this.get()
        target.scrollTop = (target.scrollTop - 20)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  }
}
</script>
