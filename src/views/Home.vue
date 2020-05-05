<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <div class="text-center mb-12">
        <v-dialog max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary darken-1" rounded x-large v-on="on">
              <v-icon left class="px-5">mdi-plus</v-icon>
              Créer un nouveau dossier
            </v-btn>
          </template>
          <item-form></item-form>
        </v-dialog>
      </div>
      <div>
        <item-card
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        ></item-card>
        <div v-if="items.length == 0" class="text-center">
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

export default {
  name: "Home",
  components: {
    ItemCard,
    ItemForm
  },
  data() {
    return {
      items: [
        {
          adress: "4 Allée fosse aux renards",
          postcode: "14123",
          city: "IFS",
          rent: 720,
          charges: 0,
          tenant1: {
            civility: "Mme",
            name: "Brochereux"
          },
          tenant2: {
            civility: "Mr",
            name: "Postil"
          }
        }
      ]
    };
  }
};
</script>
