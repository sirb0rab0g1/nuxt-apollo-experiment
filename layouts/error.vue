<template>
  <v-app dark>
    <v-container fluid fill-height>
      <v-layout wrap align-center justify-center>
        <v-card class="pa-10 elevation-15">
          <v-card-title class="my-2">
            <h1 v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 v-else>
              {{ otherError }}
            </h1>
          </v-card-title>
          <v-card-text
            v-if="error.statusCode === 500"
            class="mt-2 title">
            Log in or register to access {{ $route.path }}.
          </v-card-text>
          <v-card-text
            v-else-if="error.statusCode === 404"
            class="mt-2 title">
            The page you were looking for does not exist.
          </v-card-text>
          <v-card-text
            v-else
            class="mt-2 title">
          </v-card-text>
          <v-card-text>
            <v-card-actions>
              <v-btn
                depressed
                color="#fbb730"
                class="white--text"
                @click="logout()">
                <v-icon>keyboard_arrow_left</v-icon>Home page
              </v-btn>
            </v-card-actions>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Global from '~/plugins/mixins/global'
  export default {
    mixins: [Global],
    layout: 'empty',
    props: {
      error: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        pageNotFound: '404 Not Found',
        otherError: 'An error occurred'
      }
    },
    head () {
      const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
      return {
        title
      }
    },
    methods: {
      ...mapMutations('user', ['RESET_USER']),
      logout() {
        this.goTo('/')
      }
    }
  }
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
