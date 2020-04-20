<template>
  <v-flex>
    no id

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
  <v-btn @click="post">
    post
  </v-btn>
  </v-flex>
</template>

<script>
import {
  FETCH_EVENTS,
  CREATE_UPDATE_EVENT
} from '~/plugins/mixins/queries/events'
import Global from '~/plugins/mixins/global'

export default {
  data: () => ({
    events: {}
  }),
  mixins: [Global],
  methods: {
    post () {
      this.$apollo.mutate({
        mutation: CREATE_UPDATE_EVENT,
        variables: this.events,
        update: (store, { data: { CreateUpdateEvent } }) => {
          const todoQuery = {
            query: FETCH_EVENTS,
            variables: { first: 6, skip: 0 }
          }
          let payload = {
            node: CreateUpdateEvent.event
          }
          const todoData = store.readQuery(todoQuery)
          todoData.all_events.edges.unshift(payload)
          store.writeQuery({ ...todoQuery, data: payload })
        }
      }).then(data => {
        alert('event created')
        this.goTo('/graphqlsample')
      }).catch(data => {
        console.log(data)
      })
    }
  }
}
</script>
