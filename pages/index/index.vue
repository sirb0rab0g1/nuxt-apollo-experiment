<template>
  <v-container fluid fill-height>
    <no-ssr>
    <v-layout wrap justify-center align-center>
      <v-flex xs12 sm8 md5 lg3>
        <v-card class="elevation-12 px-2 pt-10">
          <v-text-field
            outlined
            v-model="form.email"
            label="Email Address"
            prepend-icon="person"
            class="px-2"/>
          <v-text-field
            outlined
            v-model="form.password"
            label="Password"
            prepend-icon="lock"
            class="px-2"
            type="password"/>

          <v-btn block depressed @click="login" class="white--text" color="#fbb730">
            LOGIN
          </v-btn>
          
          <v-card-actions>
            <span class="forgot-text pointer">
              Register
            </span>
            <v-spacer></v-spacer>
            <span class="forgot-text pointer">
              Forgot password
            </span>
          </v-card-actions>
          <v-card-actions>
            <v-spacer class="mx-5" />
            <span class="text-right"
            :class="$vuetify.breakpoint.lgAndDown ? 'ml-3 pl-3 caption' : 'ml-2 mr-1 overline'">
              Developed by &nbsp;
            </span>
              <v-avatar
                size="70">
              <v-img
                height="100px"
                width="100px"
                contain
                class="mb-0 px-0 mx-0"
                @click="newLink('https://infosoftstudio.com/')"
                :src="'/images/infosoft.png'"/>
              </v-img>
            </v-avatar>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    </no-ssr>
  </v-container>
</template>
<script>
  import Global from '~/plugins/mixins/global'
  export default {
    mixins: [Global],
    data: () => ({
      form: {}
    }),
    methods: {
      proceed () {
        this.goTo('/graphqlsample')
      },
      login () {
        console.log(this.form)
      },
      newLink (payload) {
        if (process.client) {
          window.open(payload, '_blank')
        }
      }
    }
  }
</script>
