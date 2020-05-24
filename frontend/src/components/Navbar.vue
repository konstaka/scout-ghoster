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
export default {
  name: 'Navbar',
  props: ['routes'],
  mounted () {
    console.log(this.routes)
  }
}
</script>

<style scoped>
#nav {
  padding: 20px;
  background-color: black;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 20px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
