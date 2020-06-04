<template>
  <v-row justify="center">
    <v-col cols="10" v-if="userProfile" class="px-0">
      <h3 class="display-1 font-weight-bold">
        {{ userProfile.firstname + " " + userProfile.lastname }}
      </h3>
      <p>{{ userProfile.email }}</p>
    </v-col>
    <v-col cols="10" class="px-0">
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary darken-1"
      >
        <v-tab exact to="/account">
          Profile
        </v-tab>
        <v-tab to="/account/account-settings">
          Paramètres du compte
        </v-tab>
      </v-tabs>
      <router-view></router-view>
    </v-col>
  </v-row>
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
