<template>
  <v-app>
    <v-progress-linear
      indeterminate
      color="primary darken-1"
      height="6px"
      v-if="loading"
    ></v-progress-linear>
    <!-- NAVBAR -->
    <app-navbar></app-navbar>

    <v-content class="background">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- FOOTER -->
    <v-footer app absolute class="transparent">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} © <strong>Goodbail</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppNavbar
  },

  computed: mapState({
    loading: state => state.loading
  })
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
