<template>
  <v-app>
    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";

export default {
  name: "App",

  components: {
    AppNavbar
  },

  data: () => ({
    //
  })
};
</script>
