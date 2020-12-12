import { db } from "@/services/firebase";
import { firestoreAction } from "vuexfire";

const state = () => ({
  rentals: [],
  rental: {}
});

const getters = {
  getRentalById: state => id => {
    return state.rentals.find(rental => rental.id === id);
  }
};

const mutations = {
  SET_RENTALS(state, payload) {
    state.rentals = payload;
  },
  SET_RENTAL(state, payload) {
    state.rental = payload;
  }
};

const actions = {
  bindRentals: firestoreAction(({ commit, rootState, bindFirestoreRef }) => {
    commit("SET_LOADING", true, { root: true });
    return bindFirestoreRef(
      "rentals",
      db.collection("rentals").where("userId", "==", rootState.user.user.uid)
    )
      .then(() => {
        commit("SET_LOADING", false, { root: true });
      })
      .catch(() => {
        commit("SET_LOADING", false, { root: true });
      });
  }),

  getRentalById({ commit }, id) {
    return db
      .collection("rentals")
      .doc(id)
      .get()
      .then(snapshot => {
        commit("SET_RENTAL", snapshot.data());
      });
  },

  addRental: firestoreAction(({ rootState }, payload) => {
    return db.collection("rentals").add({
      userId: rootState.user.user.uid,
      adress: payload.adress,
      city: payload.city,
      postcode: payload.postcode,
      rent: payload.rent,
      charges: payload.charges,
      tenants: payload.tenants
    });
  }),

  editRental: firestoreAction(({}, payload) => {
    return db.collection("rentals").doc(payload.id).set(payload)
  }),

  deleteRental: firestoreAction((context, rentalId) => {
    return db
      .collection("rentals")
      .doc(rentalId)
      .delete();
  })
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
