<template>
  <v-menu
    v-model="menu"
    :nudge-width="200"
    offset-y
    left
    origin="center center"
    transition="scale-transition"
    v-if="Object.entries(userProfile).length !== 0"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        dark
        small
        elevation="0"
        color="primary"
        v-on="on"
        class="my-auto shadow"
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
export default {
  data() {
    return {
      menu: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  },
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
