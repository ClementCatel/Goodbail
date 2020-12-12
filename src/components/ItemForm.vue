<template>
  <v-card class="text-center">
    <v-card-title class="justify-center pt-6 headline">
      Location
    </v-card-title>
    <v-card-text class="px-1 px-sm-3 px-md-6">
      <v-form v-model="valid">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" class="py-0">
              <v-subheader class="pl-0">Adresse de la location</v-subheader>
              <v-text-field
                v-model="form.adress"
                placeholder="999 avenue de France"
                solo
                hide-details
                rounded
                required
                class="pb-3"
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-subheader class="pl-0">Ville</v-subheader>
              <v-text-field
                placeholder="Paris"
                v-model="form.city"
                hide-details
                solo
                rounded
                required
                class="pb-3"
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-subheader class="pl-0">Code postal</v-subheader>
              <v-text-field
                v-model="form.postcode"
                placeholder="75001"
                hide-details
                solo
                rounded
                required
                class="pb-3"
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-row v-for="(tenant, index) in form.tenants" :key="index">
                <v-col cols="12" sm="4" class="py-0">
                  <v-subheader class="pl-0">Civilité</v-subheader>
                  <v-select
                    :items="civilities"
                    hide-details
                    v-model="tenant.civility"
                    solo
                    rounded
                    class="pb-3"
                  ></v-select>
                </v-col>

                <v-col cols="auto" class="grow py-0">
                  <v-subheader class="pl-0">Nom du locataire</v-subheader>
                  <v-text-field
                    v-model="tenant.name"
                    placeholder="Dupont Camille"
                    hide-details
                    solo
                    rounded
                    required
                    class="pb-3"
                  ></v-text-field>
                </v-col>

                <v-col cols="auto" class="pt-10 pl-0 mt-1">
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

            <v-col cols="12" md="6" class="py-0">
              <v-subheader class="pl-0">Montant du loyer</v-subheader>
              <v-text-field
                placeholder="600"
                v-model="form.rent"
                type="number"
                hide-details
                solo
                rounded
                required
                suffix="€"
                class="pb-3"
                :rules="[v => !!v]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-subheader class="pl-0">Montant des charges</v-subheader>
              <v-text-field
                placeholder="80"
                v-model="form.charges"
                hide-details
                type="number"
                solo
                rounded
                required
                suffix="€"
                class="pb-3"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="pb-0 mt-4">
              <v-btn
                large
                color="primary shadow"
                :disabled="!valid"
                rounded
                @click="save"
              >
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
      valid: true,
      civilities: ["Mme", "M."],
      form: {
        id: null,
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

  props: {
    editedRental: {
      type: Object,
      default: function() {
        return {
          id: null,
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
        };
      }
    }
  },

  methods: {
    save() {
      this.$emit("saved", this.form);
      this.form = {
        id: null,
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
      };
    },

    addTenant() {
      if (this.form.tenants.length < 2) {
        this.form.tenants.push({
          civility: "",
          name: ""
        });
      }
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
  },

  mounted() {
    this.form = Object.assign({}, this.editedRental);
    this.form.id = this.editedRental.id;
  }
};
</script>
