import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Auth0CallBack from "../views/Auth0CallBack.vue"
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth0callback",
    name: "auth0callback",
    component: Auth0CallBack,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue"),
      meta: {
        requiresAuth: true
      }
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
    path: "/students",
    name: "students",
    component: () =>
      import("../views/StudentsView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addstudents",
    name: "addStudents",
    component: () => import("../views/AddStudentsView.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Initialize Auth0 client if it hasn't been initialized yet
  if (!store.state.auth0) {
    await store.dispatch('initAuth');
  }

  if(to.matched.some(record => record.path == "/auth0callback")){
    console.log("router.beforeEach found /Auth0CallBack url");
    store.dispatch('auth0HandleAuthentication')
  }

  // Check if the user is authenticated
  const routerAuthCheck = await (await store.state.auth0)?.isAuthenticated();

  if(routerAuthCheck){
    store.commit('setUserIsAuthenticated', routerAuthCheck)
  }

  // Check if it is a protected page
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if(routerAuthCheck){
      // User is authenticated
      next()
    } else {
      router.replace('/login')
    }
  } 
  // Allow page to load
  else {
    next();
  }
});


export default router;
