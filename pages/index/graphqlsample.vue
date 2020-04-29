<template>
<div>
  <v-card style="height: 600px;">
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
          style="min-height: 400px; max-height: 400px;"> 
            <!-- <ul>
              <li v-for="(item, index) in result">
                {{ item }}
                <v-btn @click="choose(item)">choose</v-btn>
                <v-btn @click="remove(item)">remove</v-btn>
              </li>
            </ul> -->

            <v-data-table
              :items="result"
              class="elevation-1"
              hide-actions
              :headers="headers"
              style="width: 100%; max-height: 400px;"
              >
              <template v-slot:items="props">
                <td >{{ props.item.node.title }}</td>
                <td >{{ props.item.node.description }}</td>
                <td >{{ props.item.node.link }}</td>
                <td >{{ props.item.node.creation_date | monthdayyear }}</td>
                <td>
                  <v-icon small @click="choose(props.item)">edit</v-icon>
                  <v-icon small @click="remove(props.item)">delete</v-icon>
                </td>
              </template>
            </v-data-table>
        </v-layout>
      </v-container>
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
    gosearch: '',
    headers: [
      { text: 'Title', sortable: false },
      { text: 'Description', sortable: false },
      { text: 'Link', sortable: false },
      { text: 'Date Created', sortable: false },
      { text: 'Actions', sortable: false }
    ]
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
      this.filter = {first: 10, skip: 0}
      this.$set(this.filter, 'title', this.gosearch)
      this.get()
    },
    get () {
      let query = FETCH_EVENTS
      console.log(this.filter)
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
    remove (payload) {
      this.$apollo.mutate({
        mutation: DELETE_EVENT,
        variables: {id: payload.node.id},
        update: (store, { data: { CreateUpdateEvent } }) => {
          const todoQuery = {
            query: FETCH_EVENTS,
            variables: this.filter
          }
          let payload = {
            node: CreateUpdateEvent.event
          }
          const todoData = store.readQuery(todoQuery)
          let unitIndex = _.findIndex(todoData.all_events.edges, { node: { id: payload.node.id } })
          this.$delete(todoData.all_events.edges, _.toInteger(unitIndex))
          store.writeQuery({ ...todoQuery, data: payload })
        }
      }).then(data => {
        let unitIndex = _.findIndex(this.result, { node: { id: payload.node.id } })
        this.$delete(this.result, _.toInteger(unitIndex))
        console.log('item deleted')
      }).catch(data => {
        console.log(data)
      })
    },
    onScroll (e) {
      let target = e.target
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight) {
        this.filter.skip += 10
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
