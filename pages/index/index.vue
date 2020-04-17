<template>
  <v-layout>
    <v-btn @click="goTo('/graphqlsample')">go to graph sample</v-btn>
  </v-layout>
</template>
<script>
  import Global from '~/plugins/mixins/global'

  export default {
    mixins: [Global]
  }
</script>
