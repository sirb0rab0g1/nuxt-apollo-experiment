<template>
<div>
  <v-card>
    <no-ssr>
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

export default {
  data: () => ({
    result: [],
    events: {},
    customSkip: 0
  }),
  mixins: [Global, EventApollo],
  methods: {
    get () {
      let query = FETCH_EVENTS
        this.$apollo.query({ query: query, variables: {first: 6, skip: this.customSkip} }).then(data => {
        for (let item of data.data.all_events.edges) {
          this.result.push(item)
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
        this.customSkip += 6
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
