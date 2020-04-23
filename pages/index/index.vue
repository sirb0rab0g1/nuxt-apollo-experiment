<template>
  <v-layout>
    <v-btn @click="proceed">go to graph sample</v-btn>
  </v-layout>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  import { mapMutations } from 'vuex'
  export default {
    mixins: [Global],
    methods: {
      ...mapMutations('events', ['RESET_EVENT_STATE']),
      proceed () {
        this.RESET_EVENT_STATE()
        this.goTo('/graphqlsample')
      }
    }
  }
</script>
