<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Auth0 with Vue/Vuetify</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" class="mr-2">Home</v-btn>
      <v-btn to="/lessons" class="mr-2">Lessons</v-btn>
      <v-btn to="/students" class="mr-2">Students</v-btn>
      <v-btn v-if="userIsAuthenticated"   @click="toggleDialog">Logout</v-btn>
      <v-btn v-if="!userIsAuthenticated"   @click="login">Login</v-btn>

      <v-dialog v-model="dialog" persistent max-width="290px">
      <v-card>
        <v-card-title>Confirm Logout</v-card-title>
        <v-card-text>Are you sure you want to logout?</v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" @click="toggleDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="logout">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import router from './router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue';


  export default {
    name: "App",
    setup(){

      const dialog = ref<boolean>(false)
      const store = useStore();

      const userIsAuthenticated = computed(() => store.state.userIsAuthenticated)

      const beforeCreate = () => {}
      const logout = () => {
        console.log('logging out')
        store.dispatch('auth0Logout')
      }

      const toggleDialog = () => {
        dialog.value = !dialog.value
      }

      const login = () => {
        router.replace('/login')
      }

      return {
        clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
        beforeCreate,
        logout,
        userIsAuthenticated,
        login,
        dialog,
        toggleDialog
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
  padding: 30px;
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
