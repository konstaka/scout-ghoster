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
  </div>
</template>

<script>
import router from '@/router/index'
export default {
  name: 'Login',
  methods: {
    async googleSignIn () {
      const GoogleUser = await this.$gAuth.signIn()
      this.$cookies.set('id_token', GoogleUser.getAuthResponse().id_token)
      this.$store.commit('SIGN_IN')
      router.push('/')
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
</style>
