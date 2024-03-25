<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auth0 with Vue/Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="mr-2">Home</v-btn>
      <v-btn to="/about" class="mr-2">About</v-btn>
      <v-btn to="/members" class="mr-2">Members</v-btn>
      <v-btn v-if="userIsAuthenticated"   @click="logout">Logout</v-btn>
      <v-btn v-if="!userIsAuthenticated"   @click="login">Login</v-btn>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import router from './router'
import store from './store'

  export default {
    name: "App",
    setup(){

      const userIsAuthenticated = store.state.user

      const beforeCreate = () => {}
      const logout = () => {
        console.log('logging out')
      }

      const login = () => {
        router.replace('/login')
      }

      return {
        clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
        beforeCreate,
        logout,
        userIsAuthenticated,
        login
      }
    }
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
