<template>
  <div>
    <div class="login_message">
      Sign in to use ScoutGhoster
    </div>
    <div
      class="google_login"
      @click="googleSignIn"
    >
      <img
        :src="require('@/assets/btn_google_signin_light_normal_web@2x.png')"
        alt="Sign in with Google"
        class="login_button"
      >
    </div>
    <div class="small_print">
      ScoutGhoster will only work with whitelisted accounts.
      Contact your administrator for more information.
    </div>
  </div>
</template>

<script>
import router from '@/router/index'
import UserService from '@/services/user'
export default {
  name: 'Login',
  methods: {
    async googleSignIn () {
      const GoogleUser = await this.$gAuth.signIn()
      this.$cookies.set('id_token', GoogleUser.getAuthResponse().id_token)
      this.$store.commit('SIGN_IN')
      const user = await UserService.getUser()
      let roles = ''
      for (const role of user.roles) {
        roles += role + ','
      }
      this.$cookies.set('roles', roles)
      this.$store.commit('SET_USER_ROLES', user.roles)
      let nextPath = '/404'
      if (user.roles.includes('admin') || user.roles.includes('defcoord')) {
        nextPath = '/'
      } else if (user.roles.includes('scout')) {
        nextPath = '/scoutcommands'
      } else if (user.roles.includes('ghost')) {
        nextPath = '/ghostcommands'
      }
      router.push(nextPath)
    }
  }
}
</script>

<style scoped>
.login_message {
  margin-top: 70px;
  font-size: 2em;
}

.google_login {
  margin-top: 30px;
}

.login_button {
  width: 200px;
  cursor: pointer;
}

.small_print {
  margin-top: 40px;
  font-size: 0.6em;
}
</style>
