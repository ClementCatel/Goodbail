<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="text-h4 font-weight-bold mb-6 pt-8">
        Modifier mon adresse email
      </h3>
      <app-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-2">
              <v-alert v-model="alertEmail" :type="alertType" text dismissible>
                {{ alertText }}
              </v-alert>
              <v-text-field
                v-model="newEmail"
                label="Nouvelle Adresse Email"
                solo
                rounded
                required
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-4 pb-2">
              <v-btn color="primary shadow" rounded large @click="updateEmail">
                Modifier
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </app-card>
    </v-col>

    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="text-h4 font-weight-bold mb-6 pt-6">
        Modifier mon mot de passe
      </h3>
      <app-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-2">
              <v-alert
                v-model="alertPassword"
                :type="alertType"
                text
                dismissible
              >
                {{ alertText }}
              </v-alert>
              <v-text-field
                v-model="newPassword"
                label="Nouveau Mot de Passe"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                hide-details
                required
                solo
                rounded
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-2">
              <v-text-field
                v-model="confirmNewPassword"
                label="Confirmer Mot de Passe"
                :type="showPassword ? 'text' : 'password'"
                hide-details
                required
                solo
                rounded
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-4 pb-2">
              <v-btn
                color="primary shadow"
                rounded
                large
                @click="updatePassword"
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
import getFirebaseErrorMessage from "@/plugins/commonUtils";

export default {
  components: {
    AppCard
  },

  data() {
    return {
      alertEmail: false,
      alertPassword: false,
      alertType: "success",
      alertText: "",

      newEmail: "",
      newPassword: "",
      confirmNewPassword: "",
      showPassword: false
    };
  },

  computed: mapState({
    user: state => state.user.user
  }),

  methods: {
    updateEmail() {
      this.$store
        .dispatch("user/updateEmail", this.newEmail)
        .then(() => {
          this.alertType = "success";
          this.alertText = "Votre adresse email à bien été modifiée";
          this.alertEmail = true;
        })
        .catch(error => {
          this.alertType = "error";
          this.alertText = getFirebaseErrorMessage(error.code);
          this.alertEmail = true;
        });
    },
    updatePassword() {
      if (this.newPassword === this.confirmNewPassword) {
        this.$store
          .dispatch("user/updatePassword", this.newPassword)
          .then(() => {
            this.alertType = "success";
            this.alertText = "Votre mot de passe a bien été modifié";
            this.alertPassword = true;
          })
          .catch(error => {
            this.alertType = "error";
            this.alertText = getFirebaseErrorMessage(error.code);
            this.alertPassword = true;
          });
      } else {
        this.alertType = "error";
        this.alertText = "Les mots de passe saisis ne sont pas identiques";
        this.alertPassword = true;
      }
    }
  }
};
</script>

<style></style>
