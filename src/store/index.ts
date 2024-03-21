import { createStore } from "vuex";

export default createStore({
  state: {
    userIsAuthorized: false
  },
  getters: {},
  mutations: {
    setUserIsAuthenticated(state, replacement){
      state.userIsAuthorized = replacement
    }
  },
  actions: {
    auth0Login(context){
      console.log("store in auth0Login")
      // context.state.auth0.authorize()
    }
  },
  modules: {},
});
