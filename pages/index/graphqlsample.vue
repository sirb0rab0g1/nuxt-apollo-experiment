<template>
<div>
  <v-card>
    <no-ssr>
    <ul>
      <li v-for="(item, index) in result.edges">
        {{ item }}
        <v-btn @click="choose(item)">choose</v-btn>
      </li>
    </ul>
    </no-ssr>
  </v-card>

  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Title"
      v-model="events.title"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Description"
      v-model="events.description"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Link"
      v-model="events.link"
      ></v-text-field>
  </v-flex>
  <v-btn @click="update">
    update
  </v-btn>
  <v-btn @click="post">
    post
  </v-btn>
  <v-btn @click="remove">
    delete
  </v-btn>
</div>
</template>

<script>
/* eslint-disable */
import {
  FETCH_EVENTS,
  CREATE_UPDATE_EVENT,
  DELETE_EVENT
} from '~/plugins/mixins/queries/events'

export default {
  data: () => ({
    result: [],
    events: {}
  }),
  methods: {
    get () {
      let query = FETCH_EVENTS
      return this.$apollo.query({ query: query }).then(data => {
        this.result = data.data.all_events
      })
    },
    async choose (item) {
      this.events = Object.assign({}, this.events, item.node)
    },
    async update () {
      this.$apollo.mutate({
        mutation: CREATE_UPDATE_EVENT,
        variables: this.events,
        /* update: (store, { data: { CreateUpdateEvent } }) => {
          // i update nimo ang cache murag murations sa vuex
          const todoQuery = {
            query: FETCH_EVENTS
          }
          let payload = {
            node: CreateUpdateEvent.event,
            __typename: 'GraphEventsTypeEdge' 
          }
          console.log(payload)
          
          const todoData = store.readQuery(todoQuery)
          todoData.all_events.edges.push(payload)
          store.writeQuery({ ...todoQuery, data: payload })
          
        }*/
      }).then(data => {
        console.log(data)
      }).catch(data => {
        console.log(data)
      })
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
    async post () {
      this.$apollo.mutate({
        mutation: CREATE_UPDATE_EVENT,
        variables: this.events,
        update: (store, { data: { CreateUpdateEvent } }) => {
          // i update nimo ang cache murag murations sa vuex
          const todoQuery = {
            query: FETCH_EVENTS
          }
          let payload = {
            node: CreateUpdateEvent.event,
            __typename: 'GraphEventsTypeEdge' 
          }
          const todoData = store.readQuery(todoQuery)
          todoData.all_events.edges.push(payload)
          store.writeQuery({ ...todoQuery, data: payload })
        }
      }).catch(data => {
        console.log(data)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.get()
    })
  }
}
</script>
