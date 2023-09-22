<template>
  <v-container fluid fill-height>
  	<v-layout wrap justify-center align-center>
  	  <v-flex xs12 md11>
       <v-card>
          <v-card-title>Dashboard</v-card-title>
          <v-card-text>For now this route will be the redirection since auth is not available</v-card-text>

          <v-card-title class="mt-2">Nuxt/Auth</v-card-title>
          <v-card-text>The module authenticates users using a configurable authentication scheme or by using one of the directly supported providers. It provides an API for triggering authentication and accessing resulting user information. While it takes care of storing the information on the client-side, it does NOT implement session handling or provide session based authentication on the NuxtJS server. for reference and documentation go to <v-btn text small color="blue" class="text-decoration-underline" @click="newLink('https://auth.nuxtjs.org/')">https://auth.nuxtjs.org/</v-btn>
         </v-card-text>
        </v-card> 
      </v-flex>
  	</v-layout>
  </v-container>
</template>
<script>
  export default {
    middleware: 'client',
    methods: {
      newLink (payload) {
        if (process.client) {
          window.open(payload, '_blank')
        }
      }
    }
  }
</script>
