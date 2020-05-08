<template>
  <v-app-bar app flat prominent class="white px-md-12 mx-md-12 transparent">
    <v-toolbar-title class="display-1 font-weight-black my-auto"
      >Goodbail</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <profile-dropdown v-if="user"></profile-dropdown>
    <v-dialog v-model="dialog" max-width="500px" v-else>
      <template v-slot:activator="{ on }">
        <v-btn
          rounded
          outlined
          color="primary darken-2"
          class="my-auto"
          v-on="on"
          >Se connecter</v-btn
        >
      </template>
      <login-form @loggedIn="dialog = false"></login-form>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import ProfileDropdown from "@/components/ProfileDropdown";
import LoginForm from "@/components/LoginForm";

export default {
  components: {
    ProfileDropdown,
    LoginForm
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: mapState({
    user: state => state.user.user
  })
};
</script>

<style></style>
