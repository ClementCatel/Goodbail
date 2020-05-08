import { auth } from "@/services/firebase";

export default store => {
  return new Promise(resolve => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { email, uid } = user;
        return resolve(
          store.commit("user/SET_USER", { email, uid }),
          store.dispatch("userProfile/bindUserProfile")
        );
      }
      return resolve();
    });
  });
};
