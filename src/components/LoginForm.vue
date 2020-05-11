<template>
  <v-card class="text-center">
    <v-card-title class="justify-center py-6">
      <span class="headline">Connexion</span>
    </v-card-title>
    <v-card-text>
      <v-form>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-btn color="primary darken-1" rounded @click="login">
                Se connecter
              </v-btn>
            </v-col>
            <v-col cols="10">
              <router-link to="/register">Mot de passe oublié ?</router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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
          this.$router.push("/").catch(() => {});
          this.$emit("loggedIn");
        })
        .catch(error => {
          this.alertText = error.message;
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

<style></style>
