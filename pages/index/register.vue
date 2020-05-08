<template>
  <v-layout row wrap justify-center>
    <no-ssr>
      {{ errors }}
        <v-flex class="ma-3" xs12 sm8 md4 lg3>
          <v-card class="elevation-12 pa-3">
            <v-flex align="center" justify="center">
            </v-flex>
            <v-text-field
              outlined
              v-model="form.email"
              label="Email"
              :error-messages="errors.email ? errors.email[0].message : ''"
              prepend-icon="person"
              required
              class="px-2"/>
            <v-text-field
              outlined
              v-model="form.username"
              label="Username"
              :error-messages="errors.username ? errors.username[0].message : ''"
              prepend-icon="person"
              class="px-2"/>
            <v-text-field
              outlined
              v-model="form.password1"
              label="Password 1"
              :error-messages="errors.password1 ? errors.password1[0].message : ''"
              prepend-icon="person"
              class="px-2"/>
            <v-text-field
              outlined
              v-model="form.password2"
              label="Password 2"
              :error-messages="errors.password2 ? errors.password2[0].message : ''"
              prepend-icon="person"
              class="px-2"/>
            <v-text-field
              outlined
              v-model="form.first_name"
              label="First name"
              :error-messages="errors.first_name ? errors.first_name[0].message : ''"
              prepend-icon="person"
              class="px-2"/>
            <v-text-field
              outlined
              v-model="form.last_name"
              label="Last name"
              :error-messages="errors.last_name ? errors.last_name[0].message : ''"
              prepend-icon="person"
              class="px-2"/>

            <v-btn block depressed :loading="loading" @click="register" class="white--text" color="#fbb730">
              Register
            </v-btn>
          </v-card>
        </v-flex>
      </no-ssr>
    </v-layout>
</template>

<script>
import {
  CREATE_USER
} from '~/plugins/mixins/queries/auth'
import _ from 'lodash'
import Global from '~/plugins/mixins/global'
export default {
  data: () => ({
    // due to auth email didnt require so i will take some front end action
    form: {
      username: '',
      email: '',
      password1: '',
      password2: '',
      first_name: '',
      last_name: ''
    },
    loading: false,
    errors: {}
  }),
  mixins: [Global],
  methods: {
    register () {
      this.errors = {}
      // due to auth email didnt require so i will take some front end action
      // https://github.com/PedroBern/django-graphql-auth/issues/39#issue-614537617
      for (let [key, value] of Object.entries(this.form)) {
        console.log(`${key}: ${value}`)
        if (value === '') {
          let arr = [{ message: 'This field is required.' }]
          this.$set(this.errors, key, arr)
        }
      }
      if (_.isEmpty(this.errors)) {
        this.loading = true
        this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: this.form,
          fetchPolicy: 'no-cache'
        }).then(data => {
          console.log(data.data.register)
          if (data.data.register.success === false) {
            this.errors = Object.assign({}, this.errors, data.data.register.errors)
          } else {
            this.loading = false
            alert('We send you a confirmation token in your email address')
            this.goTo('/')
          }
        })
      }
    }
  }
}
</script>
