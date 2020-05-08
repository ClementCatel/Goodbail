<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="5" class="px-12">
      <h1 class="font-weight-black display-3 mb-12">
        Vos quittances de loyer en un click.
      </h1>
      <v-row class="justify-center">
        <v-col cols="10">
          <v-img
            src="@/assets/svg/undraw_printing_invoices_5r4r.svg"
            class="my-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="10" md="3" class="mx-auto">
      <app-card class="text-center py-0" max-width="600px">
        <v-card-title class="headline justify-center py-6"
          >Je créer mon compte</v-card-title
        >

        <v-card-text class="px-4 py-8">
          <v-form>
            <v-text-field
              v-model="form.lastname"
              label="Nom*"
              required
              solo
              rounded
            ></v-text-field>

            <v-text-field
              v-model="form.firstname"
              label="Prénom*"
              required
              solo
              rounded
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              label="Adresse e-mail*"
              type="email"
              required
              solo
              rounded
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="Mot de passe*"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              solo
              rounded
            ></v-text-field>

            <v-btn
              color="primary darken-2"
              outlined
              dark
              rounded
              class="my-3"
              @click="register"
              >S'inscrire</v-btn
            >
          </v-form>

          <p>
            Vous avez déjà un compte ?
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on }">
                <a v-on="on">Connexion</a>
              </template>
              <login-form></login-form>
            </v-dialog>
          </p>
        </v-card-text>
      </app-card>
    </v-col>
  </v-row>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import AppCard from "@/components/AppCard";

export default {
  components: {
    LoginForm,
    AppCard
  },
  data() {
    return {
      showPassword: false,

      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register(e) {
      e.preventDefault();

      this.$store
        .dispatch("user/register", this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>