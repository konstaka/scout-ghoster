<template>
  <div id="nav">
    <router-link
      v-for="route of routes"
      :key="route.name"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
  </div>
</template>

<script>
import router from '@/router/index'
export default {
  name: 'Navbar',
  data: () => ({
    routes: router.options.routes
  })
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

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
