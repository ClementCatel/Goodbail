<template>
  <app-card class="text-center mx-auto">
    <v-card-title class="justify-center py-2">
      <span class="title">Quittance de loyer</span>
    </v-card-title>
    <v-card-text class="py-0 px-2 px-md-4 px-lg-8">
      <v-form v-model="valid">
        <v-row justify="center">
          <v-col cols="12" class="py-2">
            <v-subheader class="pl-0">Dénomination du bailleur</v-subheader>
            <v-text-field
              v-model="form.denomination"
              solo
              rounded
              required
              :rules="[v => !!v]"
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" class="py-2">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="date1ISO"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-subheader class="pl-0">Période de location du</v-subheader>
                <v-text-field
                  v-model="form.date1Fr"
                  hide-details
                  solo
                  rounded
                  readonly
                  required
                  :rules="[v => !!v]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary darken-1"
                locale="fr"
                v-model="date1ISO"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false"
                  >Annuler</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu1.save(date1ISO)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="6" class="py-2">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="date2ISO"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-subheader class="pl-0">au</v-subheader>
                <v-text-field
                  v-model="form.date2Fr"
                  hide-details
                  solo
                  rounded
                  readonly
                  required
                  :rules="[v => !!v]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary darken-1"
                locale="fr"
                v-model="date2ISO"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false"
                  >Annuler</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu2.save(date2ISO)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" class="py-2">
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :return-value.sync="date3ISO"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-subheader class="pl-0">Date du paiement</v-subheader>
                <v-text-field
                  v-model="form.date3Fr"
                  hide-details
                  solo
                  rounded
                  readonly
                  required
                  :rules="[v => !!v]"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary darken-1"
                locale="fr"
                v-model="date3ISO"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu3 = false"
                  >Annuler</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu3.save(date3ISO)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" class="py-2">
            <v-subheader class="pl-0">Fait à</v-subheader>
            <v-text-field
              v-model="form.city"
              placeholder="Ex: Paris"
              solo
              rounded
              hide-details
              required
              :rules="[v => !!v]"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-2">
            <v-subheader class="pl-0">Signature</v-subheader>
            <v-text-field
              v-model="form.signature"
              solo
              rounded
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-2">
            <p class="signature mb-0 pt-4">{{ form.signature }}</p>
          </v-col>

          <v-col cols="12" class="pt-8">
            <v-btn
              large
              color="primary shadow"
              rounded
              class="px-6"
              active-class="shadow"
              :disabled="!valid"
              @click="generate"
            >
              <v-icon left>mdi-download</v-icon> Génerer la quittance
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </app-card>
</template>

<script>
import { mapState } from "vuex";
import AppCard from "@/components/AppCard";

export default {
  components: {
    AppCard
  },

  data() {
    return {
      valid: true,
      menu1: false,
      menu2: false,
      menu3: false,

      form: {
        denomination: "",
        date1Fr: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toLocaleDateString("fr", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        date2Fr: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).toLocaleDateString("fr", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        date3Fr: new Date().toLocaleDateString("fr", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        city: "",
        signature: ""
      },

      /* date début de la période de location */
      date1ISO: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
        .toISOString()
        .substr(0, 10),

      /* date fin de la période de location */
      date2ISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        .toISOString()
        .substr(0, 10),

      /* date du paiement */
      date3ISO: new Date().toISOString().substr(0, 10)
    };
  },

  computed: mapState({
    userProfile: state => state.userProfile.userProfile
  }),

  watch: {
    /* sync ISO dates with fr dates */
    date1ISO: function(val) {
      const date = new Date(val);
      this.form.date1Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    date2ISO: function(val) {
      const date = new Date(val);
      this.form.date2Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    date3ISO: function(val) {
      const date = new Date(val);
      this.form.date3Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },

    userProfile: function(newValue) {
      this.form.denomination = newValue.denomination;
      this.form.city = newValue.city;
      this.form.signature = newValue.signature;
    }
  },

  methods: {
    async updateUserProfile() {
      await this.$store.dispatch("userProfile/updateUserProfile", {
        userId: this.userProfile.id,
        denomination: this.form.denomination,
        city: this.form.city,
        signature: this.form.signature
      });
    },

    generate() {
      // update profile only if informations have been modified.
      if (
        this.form.denomination != this.userProfile.denomination ||
        this.form.city != this.userProfile.city ||
        this.form.signature != this.userProfile.signature
      ) {
        this.updateUserProfile();
      }
      this.$emit("generate", this.form);
    }
  },

  created() {
    this.form.denomination = this.userProfile.denomination;
    this.form.city = this.userProfile.city;
    this.form.signature = this.userProfile.signature;
  }
};
</script>

<style scoped>
@font-face {
  font-family: new-york;
  src: url("../assets/fonts/new-york.ttf");
  font-weight: normal;
}
.signature {
  font-family: new-york;
  font-size: 48px;
}
</style>
