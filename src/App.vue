<template>
  <v-app>
    <v-progress-linear
      indeterminate
      color="primary darken-1"
      height="6px"
      v-if="loading"
    ></v-progress-linear>
    <!-- NAVBAR -->
    <app-navbar v-if="!$route.matched.some(x => x.meta.noAppBar)"></app-navbar>
    <v-app-bar v-else absolute flat color="transparent">
      <v-btn text to="/">
        Revenir sur Goodbail
      </v-btn>
    </v-app-bar>

    <v-main class="background tertiary--text">
      <router-view></router-view>
    </v-main>

    <!-- FOOTER -->
    <v-footer
      app
      absolute
      class="transparent"
      v-if="$route.path != '/register'"
    >
      <v-row justify="center">
        <v-btn
          text
          small
          rounded
          class="mt-2"
          href="mailto:clement.catel4@gmail.com"
        >
          Nous contacter
        </v-btn>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} © <strong>Goodbail</strong>
        </v-col>
      </v-row>
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
  }),

  mounted() {
    if (this.$route.path != "/rentals") {
      this.$store.commit("SET_LOADING", false);
    }
  },

  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },

  methods: {
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
};
</script>

<style>
.v-btn {
  text-transform: none;
}
.shadow {
  box-shadow: rgb(105 255 213 / 30%) 0px 3px 5px 2px !important;
}
.v-subheader {
  height: 40px !important;
}
a {
  text-decoration: none;
}
</style>
