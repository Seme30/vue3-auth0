import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {  mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';


const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});

createApp(App).provide(DefaultApolloClient, apolloClient).use(store).use(vuetify).use(router).mount("#app");
