<template>
  <v-flex>
    no id
    <v-flex xs12 sm6 md3>
    <v-text-field
      label="Title"
      v-model="events.title"
      :error-messages="errors.title"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Description"
      v-model="events.description"
      :error-messages="errors.description"
      ></v-text-field>
  </v-flex>
  <v-flex xs12 sm6 md3>
    <v-text-field
      label="Link"
      v-model="events.link"
      :error-messages="errors.link"
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
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  data: () => ({
    events: {},
    errors: {}
  }),
  mixins: [Global],
  computed: {
    ...mapGetters('events', ['filter'])
  },
  methods: {
    ...mapMutations('events', ['SET_FILTER', 'RESET_EVENT_STATE']),
    post () {
      this.$apollo.mutate({
        mutation: CREATE_UPDATE_EVENT,
        variables: this.events,
        update: (store, { data: { CreateUpdateEvent } }) => {
          // wala ni siya na fetch sa db gi fetch lang ni siya sa cache
          const todoQuery = {
            query: FETCH_EVENTS,
            variables: this.filter
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
      }).catch(errors => {
        if (!_.isUndefined(errors.graphQLErrors)) {
          let err = errors.graphQLErrors.map(x => x.message)[0]
          this.errors = JSON.parse(err)
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.RESET_EVENT_STATE()
    next()
  }
}
</script>
