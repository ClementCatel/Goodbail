<template>
  <v-app-bar app flat prominent class="white px-md-12 mx-md-12">
    <v-toolbar-title class="display-1 font-weight-black my-auto"
      >Quittance</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <profile-dropdown></profile-dropdown>
  </v-app-bar>
</template>

<script>
import ProfileDropdown from "@/components/ProfileDropdown";

export default {
  components: {
    ProfileDropdown
  }
};
</script>

<style></style>
