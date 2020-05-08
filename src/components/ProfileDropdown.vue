<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    left
    origin="center center"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        dark
        small
        elevation="0"
        color="primary"
        v-on="on"
        class="my-auto"
      >
        {{ userProfile.firstname.charAt(0) + userProfile.lastname.charAt(0) }}
      </v-btn>
    </template>

    <v-card>
      <v-list class="text-center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{
              userProfile.firstname + " " + userProfile.lastname
            }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ userProfile.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list-item-group color="primary">
        <v-list-item to="/account">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Mon compte</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      menu: false
    };
  },
  methods: {
    logout() {
      if (confirm("Etes-vous sûr de vouloir vous déconnecter ?")) {
        this.$store
          .dispatch("user/logout")
          .then(() => {
            // this.$router.push("/register");
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  },
  computed: mapState({
    userProfile: state => state.userProfile.userProfile
  })
};
</script>

<style></style>
