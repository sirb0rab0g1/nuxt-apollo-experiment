<template>
<div>
  {{ result }}
  
  sample post
  
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Regular"
      v-model="events.title"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Regular"
      v-model="events.description"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Regular"
      v-model="events.link"
      ></v-text-field>
  </v-flex>
  <v-btn @click="post">
    go
  </v-btn>
</div>
</template>

<script>
import {
  FETCH_EVENTS,
  POST_EVENT
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
    async post () {
      this.$apollo.mutate({
        mutation: POST_EVENT,
        variables: this.events
      }).then(data => {
        console.log(data.data.crud_event.event)
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
