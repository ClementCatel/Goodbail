import Vue from "vue";
import Vuex from "vuex";
import { auth } from "@/services/firebase";
import { vuexfireMutations } from "vuexfire";

import user from "./user";
import userProfile from "./userProfile";
import rentals from "./rentals";

Vue.use(Vuex);

// handle page reload
auth.onAuthStateChanged(async user => {
  if (user) {
    const { email, uid } = user;

    store.commit("user/SET_USER", { email, uid });
    await store.dispatch("userProfile/bindUserProfile");

    await store.dispatch("rentals/bindRentals");
  }
});

const store = new Vuex.Store({
  mutations: {
    ...vuexfireMutations
  },
  modules: {
    user,
    userProfile,
    rentals
  }
});

export default store;
