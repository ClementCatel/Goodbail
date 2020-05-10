<template>
  <v-card class="text-center">
    <v-card-title class="justify-center py-6">
      <span class="headline">Nouveau dossier de location</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" class="py-0">
              <v-text-field
                v-model="form.adress"
                label="Adresse de la location"
                solo
                rounded
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" class="py-0">
              <v-text-field
                v-model="form.postcode"
                label="Code postal"
                solo
                rounded
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" class="py-0">
              <v-text-field
                v-model="form.city"
                label="Ville"
                solo
                rounded
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-row v-for="(tenant, index) in form.tenants" :key="index">
                <v-col cols="3" class="py-0">
                  <v-select
                    :items="civilities"
                    v-model="tenant.civility"
                    label="Civilité"
                    solo
                    rounded
                  ></v-select>
                </v-col>

                <v-col class="py-0">
                  <v-text-field
                    v-model="tenant.name"
                    label="Nom du locataire"
                    solo
                    rounded
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="auto" class="py-1">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        outlined
                        small
                        v-on="on"
                        @click="tenantAction(index)"
                      >
                        <v-icon>mdi-{{ index == 0 ? "plus" : "minus" }}</v-icon>
                      </v-btn>
                    </template>
                    <span>Ajouter un locataire</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.rent"
                label="Montant du loyer"
                type="number"
                solo
                rounded
                required
                suffix="€"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.charges"
                label="Montant des charges"
                type="number"
                solo
                rounded
                required
                suffix="€"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-btn color="primary darken-1" rounded @click="addRental">
                Enregistrer
              </v-btn>
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
      civilities: ["Mme", "Mr"],
      form: {
        adress: "",
        postcode: "",
        city: "",
        rent: null,
        charges: null,
        tenants: [
          {
            civility: "",
            name: ""
          }
        ]
      }
    };
  },
  methods: {
    addRental() {
      this.$emit("saved", this.form);
    },

    addTenant() {
      this.form.tenants.push({
        civility: "",
        name: ""
      });
    },
    removeTenant() {
      this.form.tenants.pop();
    },
    tenantAction(index) {
      if (index == 0) {
        this.addTenant();
      } else {
        this.removeTenant();
      }
    }
  }
};
</script>

<style></style>
