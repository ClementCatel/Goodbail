<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="display-2 font-weight-bold mb-8 pt-8">
        Modifier Adresse Email
      </h3>
      <app-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-2">
              <v-text-field
                v-model="newEmail"
                label="Nouvel Adresse Email"
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

    <v-col cols="12" md="8" class="mx-auto">
      <h3 class="display-2 font-weight-bold mb-8 pt-8">
        Modifier Mot de Passe
      </h3>
      <app-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-2">
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
      newEmail: "",
      newPassword: "",
      confirmNewPassword: "",
      showPassword: false
    };
  },
  computed: mapState({
    user: state => state.user.user
  })
};
</script>

<style></style>
