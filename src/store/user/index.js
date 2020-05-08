import { auth } from "@/services/firebase";
import { db } from "@/services/firebase";

const state = () => ({
  user: null
});

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  }
};

const actions = {
  async register({ commit, dispatch }, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);
    const { email, uid } = auth.currentUser;
    commit("SET_USER", { email, uid });

    await db
      .collection("users")
      .doc(uid)
      .set({
        firstname: payload.firstname,
        lastname: payload.lastname,
        denomination: payload.firstname + " " + payload.lastname,
        city: "",
        email: payload.email
      });

    dispatch("userProfile/fetchUserProfile", null, { root: true });
  },

  async login({ commit }, payload) {
    // Login the user
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
    const { email, uid } = auth.currentUser;
    commit("SET_USER", { email, uid });
  },

  async logout({ commit }) {
    await auth.signOut();
    commit("SET_USER", null);
    commit("userProfile/SET_USER_PROFILE", null, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
