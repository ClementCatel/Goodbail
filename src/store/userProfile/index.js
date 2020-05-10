import { db } from "@/services/firebase";
import { firestoreAction } from "vuexfire";

const state = () => ({
  userProfile: {}
});

const mutations = {
  SET_USER_PROFILE(state, payload) {
    state.userProfile = payload;
  }
};

const actions = {
  bindUserProfile: firestoreAction(async ({ bindFirestoreRef, rootState }) => {
    await bindFirestoreRef(
      "userProfile",
      db.collection("users").doc(rootState.user.user.uid)
    );
  }),

  updateUserProfile: firestoreAction(({ state }, payload) => {
    const user = { ...state.userProfile };
    return db
      .collection("users")
      .doc(state.userProfile.id)
      .update({
        firstname: payload.firstname ? payload.firstname : user.firstname,
        lastname: payload.lastname ? payload.lastname : user.lastname,
        // eslint-disable-next-line prettier/prettier
        denomination: payload.denomination ? payload.denomination : user.denomination,
        city: payload.city ? payload.city : user.city,
        signature: payload.signature ? payload.signature : user.signature
      });
  })
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
