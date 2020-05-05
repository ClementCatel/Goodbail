<template>
  <v-row>
    <v-col cols="12" md="6" class="px-12">
      <app-card class="text-center">
        <v-card-title class="justify-center py-2">
          <span class="headline">Quittance de loyer</span>
        </v-card-title>
        <v-card-text class="py-0">
          <v-form>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" class="py-2">
                  <v-subheader>Dénomination du propriétaire</v-subheader>
                  <v-text-field
                    v-model="landlord"
                    solo
                    rounded
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col cols="6" class="py-2">
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
                      <v-subheader>Période de location du</v-subheader>
                      <v-text-field
                        v-model="date1Fr"
                        hide-details
                        solo
                        rounded
                        readonly
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
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu1.save(date1ISO)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="6" class="py-2">
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
                      <v-subheader>au</v-subheader>
                      <v-text-field
                        v-model="date2Fr"
                        hide-details
                        solo
                        rounded
                        readonly
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
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(date2ISO)"
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
                      <v-subheader>Date du paiement</v-subheader>
                      <v-text-field
                        v-model="date3Fr"
                        hide-details
                        solo
                        rounded
                        readonly
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
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu3.save(date3ISO)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" class="py-2">
                  <v-subheader>Fait à</v-subheader>
                  <v-text-field
                    v-model="city"
                    label="Ville"
                    solo
                    rounded
                    hide-details
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="py-2">
                  <v-subheader>Votre signature</v-subheader>
                  <v-file-input
                    hide-details
                    :rules="rules"
                    accept="image/png, image/jpeg"
                    placeholder="Choisir un fichier au format .png ou .jpeg"
                    prepend-icon="mdi-signature-freehand"
                    solo
                    rounded
                  ></v-file-input>
                </v-col>

                <v-col cols="12" class="pt-8">
                  <v-btn color="primary darken-1" rounded>
                    Enregistrer
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </app-card>
    </v-col>

    <v-col cols="12" md="6" align-self="center" class="text-center">
      <v-btn color="primary darken-1" rounded>
        <v-icon left>mdi-download</v-icon> Génerer le PDF
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AppCard from "@/components/AppCard";

export default {
  components: {
    AppCard
  },

  data() {
    return {
      landlord: "",
      /* date début de la période de location */
      date1ISO: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
        .toISOString()
        .substr(0, 10),
      date1Fr: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),

      /* date fin de la période de location */
      date2ISO: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        .toISOString()
        .substr(0, 10),
      date2Fr: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),

      /* date du paiement */
      date3ISO: new Date().toISOString().substr(0, 10),
      date3Fr: new Date().toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),

      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Votre image doit faire moins de 2 MB!"
      ],

      city: "",

      menu1: false,
      menu2: false,
      menu3: false
    };
  },

  watch: {
    /* sync ISO dates with fr dates */
    date1ISO: function(val) {
      const date = new Date(val);
      this.date1Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    date2ISO: function(val) {
      const date = new Date(val);
      this.date2Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    date3ISO: function(val) {
      const date = new Date(val);
      this.date3Fr = date.toLocaleDateString("fr", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  }
};
</script>
