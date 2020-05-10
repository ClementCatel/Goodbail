import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../services/firebase";

import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Generate from "../views/Generate.vue";
import Account from "../views/Account.vue";
import Profile from "../views/account/Profile.vue";
import Settings from "../views/account/Settings.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/generate/:id",
    name: "generate",
    meta: { requiresAuth: true },
    component: Generate
  },
  {
    path: "/account",
    meta: { requiresAuth: true },
    component: Account,
    children: [
      {
        path: "",
        name: "profile",
        meta: { requiresAuth: true },
        component: Profile
      },
      {
        path: "account-settings",
        name: "account-settings",
        meta: { requiresAuth: true },
        component: Settings
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  auth.onAuthStateChanged(function(user) {
    if (requiresAuth && !user) {
      next("/register");
    } else if (!requiresAuth && user) {
      next("/");
    } else {
      next();
    }
  });
});

export default router;
