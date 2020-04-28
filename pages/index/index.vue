<template>
  <v-layout>
    <v-btn @click="proceed">go to graph sample</v-btn>
  </v-layout>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  export default {
    mixins: [Global],
    methods: {
      proceed () {
        this.goTo('/graphqlsample')
      }
    }
  }
</script>
