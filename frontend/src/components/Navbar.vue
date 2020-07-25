<template>
  <div id="nav">
    <router-link
      v-for="route of routes"
      :key="route.name"
      :to="route.path"
      :class="{ hidden: !showLink(route.roles) }"
    >
      {{ route.name }}
    </router-link>
    <div
      v-if="$store.state.isSignIn"
      class="sign_in"
      @click="signOut"
    >
      Sign out
    </div>
  </div>
</template>

<script>
import router from '@/router/index'
export default {
  name: 'Navbar',
  data: () => ({
    routes: router.options.routes
  }),
  methods: {
    showLink (roles) {
      return roles.some((r) => {
        return this.$store.state.roles.includes(r)
      })
    },
    async signOut () {
      this.$cookies.remove('id_token')
      this.$cookies.remove('roles')
      this.$store.commit('SIGN_OUT')
      if (router.history.current.path !== '/login') {
        router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 20px;
  background-color: #1a252f;
}

#nav a {
  font-weight: bold;
  color: #476481;
  margin: 20px;
  text-decoration: none;
}

#nav a:first-of-type {
  display: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width: 1330px) {
  #nav a {
    margin: 10px;
  }
}

@media screen and (max-width: 1024px) {
  #nav a {
    margin: 4px;
  }
}

@media screen and (max-width: 768px) {
  #nav a {
    margin: 2px;
    display: flex;
  }
}

.sign_in {
  color: #dbe3eb;
  position: absolute;
  top: 20px;
  right: 48px;
  cursor: pointer;
}

.hidden {
  display: none !important;
}
</style>
