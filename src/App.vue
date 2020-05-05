<template>
  <v-app>
    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <v-content class="background">
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- FOOTER -->
    <v-footer app class="transparent">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} © <strong>Goodbail</strong>
      </v-col>
    </v-footer>
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
