<template>
  <v-app-bar app flat prominent class="white px-md-12 mx-md-12 transparent">
    <v-toolbar-title class="display-1 font-weight-black my-auto"
      >Goodbail</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-dialog max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn
          rounded
          outlined
          color="primary darken-2"
          class="my-auto"
          v-on="on"
          >Se connecter</v-btn
        >
      </template>
      <login-form></login-form>
    </v-dialog>
    <profile-dropdown></profile-dropdown>
  </v-app-bar>
</template>

<script>
import ProfileDropdown from "@/components/ProfileDropdown";
import LoginForm from "@/components/LoginForm";

export default {
  components: {
    ProfileDropdown,
    LoginForm
  }
};
</script>

<style></style>
