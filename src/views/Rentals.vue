<template>
  <v-container fluid fill-height class="py-0 px-md-0">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div class="text-center mb-12">
          <v-alert v-model="alert" :type="alertType" text dismissible>
            {{ alertText }}
          </v-alert>
          <v-dialog max-width="580px" v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn color="primary shadow" rounded x-large v-on="on">
                <v-icon left class="px-5">mdi-plus</v-icon>
                Ajouter une location
              </v-btn>
            </template>
            <item-form v-if="dialog" @saved="addRental"></item-form>
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
                  <v-dialog max-width="580px" v-model="dialogEdit">
                    <template v-slot:activator="{ on }">
                      <v-list-item v-on="on">
                        <v-list-item-title>Modifier</v-list-item-title>
                      </v-list-item>
                    </template>
                    <item-form v-if="dialogEdit" :editedRental="item" @saved="editRental"></item-form>
                  </v-dialog>
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
          <div v-if="rentals.length == 0 && !loading" class="text-center">
            <v-img
              src="@/assets/svg/undraw_no_data_qbuo.svg"
              max-width="300"
              class="mx-auto"
            ></v-img>
            <p class="py-6">C'est bien vide ici...</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
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

      dialog: false,
      dialogEdit: false
    };
  },
  methods: {
    /* Ajouter un dossier de location */
    async addRental(rental) {
      try {
        await this.$store.dispatch("rentals/addRental", rental);
        this.alertType = "success";
        this.alertText =
          "Location enregistrée ! cliquez dessus pour générer une quittance de loyer";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Oops, nous n'avons pas pu enregistrer vos informations";
        this.alert = true;
      }
      this.dialog = false;
    },

    /* Supprimer un dossier de location */
    async deleteRental(id) {
      try {
        await this.$store.dispatch("rentals/deleteRental", id);
        this.alertType = "success";
        this.alertText = "La location a bien été supprimée";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Oops, cette location n'a pas pu être supprimée";
        this.alert = true;
      }
    },

    /* Modifier un dossier de location */
    async editRental(rental) {
      try {
        await this.$store.dispatch("rentals/editRental", rental);
        this.alertType = "success";
        this.alertText = "La location a bien été modifiée";
        this.alert = true;
      } catch (error) {
        this.alertType = "error";
        this.alertText =
          "Une erreur s'est produite, votre dossier n'a pas pu être modifié";
        this.alert = true;
      }
      this.dialogEdit = false;
    }
  },

  computed: mapState({
    rentals: state => state.rentals.rentals,
    loading: state => state.loading
  })
};
</script>
