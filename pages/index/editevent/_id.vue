<template>
  <v-flex>
    <center>
      <croppa ref="sample" :height="250" :width='250' class="mt-4"/>
    </center>
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
    <v-btn @click="update">
      update
    </v-btn>
  </v-flex>
</template>

<script>
import {
  FETCH_EVENTS,
  CREATE_UPDATE_EVENT
} from '~/plugins/mixins/queries/events'
import Global from '~/plugins/mixins/global'
import _ from 'lodash'

export default {
  data: () => ({
    events: {},
    errors: {},
    sample: {}
  }),
  mixins: [Global],
  methods: {
    get () {
      let query = FETCH_EVENTS
      this.$apollo.query({ query: query, variables: { getid: this.$nuxt._route.params.id } }).then(data => {
        this.events = data.data.all_events.edges[0].node
      })
    },
    update () {
      this.$set(this.events, 'data_url', this.$refs.sample.generateDataUrl())
      if (!_.isUndefined(this.$refs.sample.getChosenFile())) {
        this.$set(this.events, 'file_name', _.replace(this.$refs.sample.getChosenFile().name, ' ', '_'))
      }
      this.$apollo.mutate({
        mutation: CREATE_UPDATE_EVENT,
        variables: this.events,
        update: (store, { data: { CreateUpdateEvent } }) => {
          const todoQuery = {
            query: FETCH_EVENTS,
            variables: { getid: this.$nuxt._route.params.id }
          }
          let payload = {
            node: CreateUpdateEvent.event
          }
          const todoData = store.readQuery(todoQuery)
          let unitIndex = _.findIndex(todoData.all_events.edges, { node: { id: this.$nuxt._route.params.id } })
          todoData.all_events.edges[unitIndex] = payload
          store.writeQuery({ ...todoQuery, data: payload })
        }
      }).then(data => {
        alert('event updated')
        this.goTo('/graphqlsample')
      }).catch(errors => {
        if (!_.isUndefined(errors.graphQLErrors)) {
          let err = errors.graphQLErrors.map(x => x.message)[0]
          this.errors = JSON.parse(err)
        }
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
