<template>
    <v-layout row wrap justify-center>
      <no-ssr>
        <v-flex class="ma-3" xs12 sm8 md4 lg3>
          <v-card class="elevation-12 pa-3">
            <v-flex align="center" justify="center">
            </v-flex>
            <v-text-field
              outlined
              v-model="form.email"
              label="Email Address"
              prepend-icon="person"
              class="px-2"/>
           
            <v-text-field
              v-model="form.password"
              label="Password"
              prepend-icon="lock"
              class="px-2"
              type="password"/>

            <v-btn block depressed @click="login" class="white--text" color="#fbb730">
              LOGIN
            </v-btn>
            
            <v-card-actions>
              <span class="forgot-text pointer" @click="goTo('/register')">
                Register
              </span>
              <v-spacer></v-spacer>
              <span class="forgot-text pointer">
                Forgot password
              </span>
            </v-card-actions>
          </v-card>
        </v-flex>
      </no-ssr>
    </v-layout>
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
      }
    }
  }
</script>
