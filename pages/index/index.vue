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
            :error-messages="errors['email']"
            class="px-2"
            />
          <v-text-field
            outlined
            v-model="form.password"
            label="Password"
            prepend-icon="lock"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :error-messages="errors['password']"
            class="px-2"
          />

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
  import { isEmpty } from 'lodash'
  export default {
    mixins: [Global],
    data: () => ({
      form: {},
      errors: {},
      show: false
    }),
    methods: {
      proceed () {
        this.goTo('/graphqlsample')
      },
      login () {
        // one method used in nuxt/auth is this.$auth.loginWith (Set current strategy to strategyName and attempt login.
        // Usage varies by current strategy.)
  
        // if (!isEmpty(this.form.email) && !isEmpty(this.form.password)) {
        //   this.loading = true
        //   this.$auth.loginWith('local', {
        //     data: {
        //       ...this.form
        //     }
        //   })
        //   .then(res => {
        //     this.SET_USER(res.data)
        //     localStorage.setItem('token', res.data.success)
        //     if (res.data.user) {
        //       // if user: false in nuxt.config.js do set user manually
        //       this.$auth.setUser(res.data.user)
        //       this.goTo('/dashboard')
        //     }
        //   })
        //   .catch(err => {
        //     if (err) {
        //       this.loading = false
        //       if (err.response) {
        //         if (err.response.data.errors) {
        //           this.errors = err.response.data.errors
        //         }
        //       } else {
        //         console.log('err:', err)
        //       }
        //     }
        //   }).finally(() => {
        //     this.loading = false
        //   })
        // } else {
        //   if (isEmpty(this.form.email)) {
        //     this.$set(this.errors, 'email', ['Email is required'])
        //   }
        //   if (isEmpty(this.form.email)) {
        //     this.$set(this.errors, 'password', ['Password is required'])
        //   }
        // }
        this.goTo('/dashboard')
      },
      newLink (payload) {
        if (process.client) {
          window.open(payload, '_blank')
        }
      }
    }
  }
</script>
