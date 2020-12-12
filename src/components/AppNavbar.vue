<template>
  <v-app-bar
    app
    flat
    absolute
    class="white transparent pt-3"
  >
    <v-container fluid class="px-0">
      <v-row justify="center">
        <v-col cols="6" md="4" lg="4" xl="3" class="pa-0">
            <v-toolbar-title class="display-1 font-weight-black pb-0">
              <router-link to="/" class="my-auto black--text">
                Goodbail
              </router-link>
            </v-toolbar-title>
        </v-col>

        <v-col cols="6" md="4" lg="4" xl="3" class="text-right py-0">
          <profile-dropdown
            v-if="user && userProfile"
            :user-profile="userProfile"
          ></profile-dropdown>

          <v-dialog v-model="dialog" max-width="500px" v-else>
            <template v-slot:activator="{ on }">
              <v-btn
                rounded
                outlined
                large
                color="primary"
                class="my-auto"
                v-on="on"
                >Mon compte</v-btn
              >
            </template>
            <login-form @loggedIn="dialog = false"></login-form>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
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
    user: state => state.user.user,
    userProfile: state => state.userProfile.userProfile
  })
};
</script>

<style></style>
