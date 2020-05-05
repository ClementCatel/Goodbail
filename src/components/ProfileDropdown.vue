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
        CC
      </v-btn>
    </template>

    <v-card>
      <v-list class="text-center">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Clément Catel</v-list-item-title>
            <v-list-item-subtitle>
              clement.catel4@gmail.com
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list-item-group color="primary">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Mon Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
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
  }
};
</script>

<style></style>
