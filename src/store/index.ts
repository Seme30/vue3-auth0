import { createStore } from "vuex";
import { createAuth0, } from "@auth0/auth0-vue";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import router from "../router/index";


interface User {
  // Define the properties of the User object here
}

const config = {
  domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID
};

export default createStore({
  state: {
    userIsAuthenticated: false as boolean | undefined,
    user: undefined as User | undefined,
    loading: true,
    auth0: undefined as ReturnType<typeof createAuth0Client> | undefined,
  },
  getters: {},
  mutations: {
    setUserIsAuthenticated(state, replacement: boolean){
      state.userIsAuthenticated = replacement;
    },
    setAuth0Client(state, auth0Client: ReturnType<typeof createAuth0Client>) {
      state.auth0 = auth0Client;
    }
  },
  actions: {
    async initAuth(context){
      context.state.loading = true;
      const auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
        cacheLocation: 'localstorage',
        authorizationParams: {
          redirect_uri: process.env.VUE_APP_AUTH0_DOMAINURL+'/auth0callback'
        }
      });
      context.commit('setAuth0Client', auth0Client);
      context.state.loading = false;
    },
    async auth0Login(context){
      if (!context.state.auth0) {
        await context.dispatch('initAuth');
      }
      (await context.state.auth0)?.loginWithRedirect();
      context.state.userIsAuthenticated = await (await context.state.auth0)?.isAuthenticated(),
      context.state.user = (await context.state.auth0)?.getUser()
    },
    async auth0HandleAuthentication(context){
      if (!context.state.auth0) {
        await context.dispatch('initAuth');
      }
      if(context.state.auth0){
        try {
          await (await context.state.auth0).handleRedirectCallback();
          context.state.userIsAuthenticated = await (await context.state.auth0).isAuthenticated();
          console.log(context.state.userIsAuthenticated)
          context.state.user = (await context.state.auth0).getUser();
          console.log("Success")
          router.replace('/')
        } catch (error) {
          console.error("Error handling redirect");
          console.error(error)
          router.replace('/login')
        }
      }
    },
    
    async auth0Logout(context){
      if (!context.state.auth0) {
        await context.dispatch('initAuth');
      }
      else {
        (await context.state.auth0).logout();
        context.state.userIsAuthenticated = false;
        context.state.user = undefined;
      }
    }
    
  },
    
  modules: {},
});
