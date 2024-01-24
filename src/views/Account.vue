<template>
  <v-container fluid class="py-0 px-md-0">
    <v-row justify="center" align-content="start">
      <v-col cols="12" md="8" lg="6" class="mt-8" v-if="userProfile">
        <h3 class="display-1 font-weight-bold">
          {{ userProfile.firstname + " " + userProfile.lastname }}
        </h3>
        <p>{{ userProfile.email }}</p>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary darken-1"
        >
          <v-tab exact to="/account">
            Profil
          </v-tab>
          <v-tab to="/account/account-settings">
            Paramètres du compte
          </v-tab>
        </v-tabs>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tab: null
    };
  },

  computed: mapState({
    userProfile: state => state.userProfile.userProfile
  })
};
</script>

<style></style>
