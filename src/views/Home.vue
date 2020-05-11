<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="text-center mb-12">
        <v-alert v-model="alert" :type="alertType" text dismissible>
          {{ alertText }}
        </v-alert>
        <v-dialog max-width="700px" v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-btn color="primary darken-1" rounded x-large v-on="on">
              <v-icon left class="px-5">mdi-plus</v-icon>
              nouveau dossier
            </v-btn>
          </template>
          <item-form @saved="addRental"></item-form>
        </v-dialog>
      </div>

      <div>
        <v-row v-for="(item, index) in rentals" :key="index">
          <v-col>
            <item-card :item="item" @deleted="deleteRental"></item-card>
          </v-col>
          <v-col cols="auto">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="secondary" icon small v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Modifier</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteRental(item.id)">
                  <v-list-item-title>
                    Supprimer
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>

        <!-- NO DATA -->
        <div v-if="rentals.length == 0" class="text-center">
          <v-img
            src="@/assets/svg/undraw_no_data_qbuo.svg"
            max-width="400"
            class="mx-auto"
          ></v-img>
          <p class="py-6">Aucun dossier trouvé</p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ItemCard,
    ItemForm
  },
  data() {
    return {
      alert: false,
      alertType: "success",
      alertText: "",

      dialog: false
    };
  },
  methods: {
    /* Ajouter un dossier de location */
    async addRental(rental) {
      try {
        await this.$store.dispatch("rentals/addRental", rental);
        this.alertType = "success";
        this.alertText =
          "dossier enregistré ! cliquez dessus pour pouvoir générer une quittance de loyer";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Une erreur s'est produite, votre dossier n'a pas pu être enregistré";
        this.alert = true;
      }
      this.dialog = false;
    },

    /* Supprimer un dossier de location */
    async deleteRental(id) {
      try {
        await this.$store.dispatch("rentals/deleteRental", id);
        this.alertType = "success";
        this.alertText = "Le dossier a bien été supprimé";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Une erreur s'est produite, Votre dossier n'a pas pu être supprimé";
        this.alert = true;
      }
    },

    /* Modifier un dossier de location */
    async editRental(rental) {
      try {
        await this.$store.dispatch("rentals/editRentals", rental);
        this.alertType = "success";
        this.alertText = "Votre dossier a bien été modifié";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Une erreur s'est produite, votre dossier n'a pas pu être modifié";
        this.alert = true;
      }
    }
  },

  computed: mapState({
    rentals: state => state.rentals.rentals
  })
};
</script>
