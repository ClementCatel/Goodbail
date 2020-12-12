<template>
  <v-card class="text-center">
    <v-card-title class="justify-center py-6">
      <span class="headline">Connexion</span>
    </v-card-title>
    <v-card-text class="px-2">
      <v-form v-model="valid">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" class="py-0">
              <v-alert v-model="alert" type="error" text dismissible>
                {{ alertText }}
              </v-alert>
              <v-text-field
                v-model="form.email"
                label="Adresse e-mail"
                type="email"
                solo
                rounded
                required
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="form.password"
                label="Mot de passe"
                type="password"
                solo
                rounded
                required
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-btn
                large
                color="primary shadow"
                rounded
                :disabled="!valid"
                @click="login"
              >
                Se connecter
              </v-btn>
            </v-col>
            <v-col cols="10">
              <router-link to="/forgot-password"
                ><span>Mot de passe oublié ?</span></router-link
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import getFirebaseErrorMessage from "@/plugins/commonUtils";

export default {
  data() {
    return {
      valid: true,
      alert: false,
      alertText: "",
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login(e) {
      e.preventDefault();

      this.$store
        .dispatch("user/login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.resetForm();
          this.$emit("loggedIn");
          this.$router.push("/rentals").catch(() => {});
        })
        .catch(error => {
          this.alertText = getFirebaseErrorMessage(error.code);
          this.alert = true;
        });
    },
    resetForm() {
      this.form = {
        email: "",
        password: ""
      };
    }
  }
};
</script>
