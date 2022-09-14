<template>
  <v-flex>
    <nuxtlogo />
    <igit-tobol />
    {{ msg }}
    <v-btn v-if="show" @click="goTo('/')">
      proceed to login screen
    </v-btn>
  </v-flex>
</template>

<script>
  import {
    VERIFY_ACCOUNT
  } from '~/plugins/mixins/queries/auth'
  import Global from '~/plugins/mixins/global'

  export default {
    data: () => ({
      msg: 'validating account please wait',
      show: false
    }),
    mixins: [Global],
    methods: {
      sendvalidationtoken () {
        let token = { token: this.$nuxt._route.params.id }
        this.$apollo.mutate({
          mutation: VERIFY_ACCOUNT,
          variables: token,
          fetchPolicy: 'no-cache'
        }).then(data => {
          if (data.data.verify_account.success === true) {
            this.msg = 'Account is now verified'
            this.show = true
          } else {
            this.msg = data.data.verify_account.errors.nonFieldErrors[0].message
          }
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.sendvalidationtoken()
      })
    }
  }
</script>
