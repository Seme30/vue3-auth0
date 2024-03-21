import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () =>
      import("../views/ContactsView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/members",
    name: "members",
    component: () =>
      import("../views/MembersView.vue"),
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const routerAuthCheck = true
  if(routerAuthCheck){
    store.commit('setUserIsAuthenticated', true)
  }
  //check if it is a protected page
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //check if user is authenticated
    if(routerAuthCheck){
        // user is authenticated
        // TODO: commit to Store that the user is authenticated
        next()
    } else {
      router.replace('/login')
    }
  } 
  // allow page to load
  else {
    next();
  }
});
export default router;
