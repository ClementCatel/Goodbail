<template>
  <app-card clickable class="mx-auto">
    <v-row>
      <v-col>
        <span class="primary--text text--darken-1">
          {{ item.adress }} {{ item.postcode }} {{ item.city }}
        </span>
        <h4 class="title font-weight-bold mb-3">
          {{ item.tenant1.civility }} {{ item.tenant1.name }}
          <span v-if="item.tenant2"
            >et {{ item.tenant1.civility }} {{ item.tenant1.name }}</span
          >
        </h4>
        <span>{{ item.rent + item.charges }} €</span>
      </v-col>
      <v-col cols="auto" class="pt-0">
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
            <v-list-item>
              <v-list-item-title>Supprimer</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </app-card>
</template>

<script>
import AppCard from "@/components/AppCard";

export default {
  components: {
    AppCard
  },
  props: {
    item: Object
  }
};
</script>
