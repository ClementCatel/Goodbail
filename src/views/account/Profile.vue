<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="text-h4 font-weight-bold mb-8 pt-8">
        Modifier Profil
      </h3>
      <app-card>
        <v-card-text class="pt-0">
          <v-row justify="center">
            <v-col cols="12" class="py-2">
              <v-alert v-model="alert" :type="alertType" text dismissible>
                {{ alertText }}
              </v-alert>
              <v-subheader class="pl-0">Prénom</v-subheader>
              <v-text-field
                v-model="form.firstname"
                solo
                rounded
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-2">
              <v-subheader class="pl-0">Nom</v-subheader>
              <v-text-field
                v-model="form.lastname"
                solo
                rounded
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="pt-4 pb-2">
              <v-btn
                color="primary shadow"
                rounded
                large
                @click="updateProfile"
              >
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
      alert: false,
      alertType: "success",
      alertText: "",
      form: {
        firstname: "",
        lastname: ""
      }
    };
  },

  computed: mapState({
    userProfile: state => state.userProfile.userProfile
  }),

  methods: {
    async updateProfile() {
      if (
        this.form.firstname != this.userProfile.firstname ||
        this.form.lastname != this.userProfile.lastname
      ) {
        try {
          await this.$store.dispatch("userProfile/updateUserProfile", {
            userId: this.userProfile.id,
            firstname: this.form.firstname,
            lastname: this.form.lastname
          });
          this.alertType = "success";
          this.alertText = "Votre Profil a bien été modifié";
        } catch (error) {
          this.alertType = "error";
          this.alertText = error.message;
        }
        this.alert = true;
      }
    }
  },

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
