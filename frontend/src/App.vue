<template>
  <div id="app">
    <Navbar :routes="routes" />
    <router-view />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import router from '@/router/index'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    routes: router.options.routes
  })
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
