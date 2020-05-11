<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="display-2 font-weight-bold mb-8 pt-8">
        Modifier Profile
      </h3>
      <app-card>
        <v-card-text class="pt-0">
          <v-row justify="center">
            <v-col cols="12" class="py-2">
              <v-subheader>Prénom</v-subheader>
              <v-text-field
                v-model="form.firstname"
                solo
                rounded
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-2">
              <v-subheader>Nom</v-subheader>
              <v-text-field
                v-model="form.lastname"
                solo
                rounded
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="pt-4 pb-2">
              <v-btn color="primary darken-1" rounded large>
                Modifier
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </app-card>
    </v-col>
  </v-row>
</template>

<script>
import AppCard from "@/components/AppCard";
import { mapState } from "vuex";

export default {
  components: {
    AppCard
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        signature: ""
      }
    };
  },
  computed: mapState({
    userProfile: state => state.userProfile.userProfile
  }),
  created() {
    this.form.firstname = this.userProfile.firstname;
    this.form.lastname = this.userProfile.lastname;
  },
  watch: {
    userProfile: function(newValue) {
      this.form.firstname = newValue.firstname;
      this.form.lastname = newValue.lastname;
    }
  }
};
</script>

<style></style>
