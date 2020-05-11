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
  register({ commit, dispatch }, payload) {
    commit("SET_LOADING", true, { root: true });
    return auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit("SET_LOADING", false, { root: true });

        const { email, uid } = auth.currentUser;
        commit("SET_USER", { email, uid });

        const fullname = payload.firstname + " " + payload.lastname;

        db.collection("users")
          .doc(uid)
          .set({
            firstname: payload.firstname,
            lastname: payload.lastname,
            denomination: fullname,
            city: "",
            signature: fullname,
            email: payload.email
          })
          .then(() => {
            dispatch("userProfile/bindUserProfile", null, { root: true });
          });
      })
      .catch(error => {
        commit("SET_LOADING", false, { root: true });
        throw error;
      });
  },

  login({ commit }, payload) {
    commit("SET_LOADING", true, { root: true });
    return auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit("SET_LOADING", false, { root: true });
        const { email, uid } = auth.currentUser;
        commit("SET_USER", { email, uid });
      })
      .catch(error => {
        commit("SET_LOADING", false, { root: true });
        throw error;
      });
  },

  async logout({ commit }) {
    await auth.signOut();
    commit("SET_USER", null);
    commit("userProfile/SET_USER_PROFILE", {}, { root: true });
  },

  updateEmail({ commit, rootState }, payload) {
    commit("SET_LOADING", true, { root: true });
    return auth.currentUser
      .updateEmail(payload)
      .then(() => {
        db.collection("users")
          .doc(rootState.userProfile.userProfile.id)
          .update({
            email: payload
          });
        commit("SET_LOADING", false, { root: true });
      })
      .catch(error => {
        commit("SET_LOADING", false, { root: true });
        throw error;
      });
  },

  updatePassword({ commit }, payload) {
    commit("SET_LOADING", true, { root: true });
    return auth.currentUser
      .updatePassword(payload)
      .then(() => {
        commit("SET_LOADING", false, { root: true });
      })
      .catch(error => {
        commit("SET_LOADING", false, { root: true });
        throw error;
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
