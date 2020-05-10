<template>
  <router-link :to="{ name: 'generate', params: { id: this.item.id } }">
    <app-card clickable class="mx-auto">
      <v-row>
        <v-col>
          <span class="primary--text text--darken-1">
            {{ item.adress }} {{ item.postcode }} {{ item.city }}
          </span>
          <h4 class="title black--text font-weight-bold mb-3">
            <div v-for="(tenant, index) in item.tenants" :key="index">
              {{ tenant.civility }} {{ tenant.name }}
            </div>
          </h4>
          <span class="black--text">
            {{ parseInt(item.rent) + parseInt(item.charges) }} €
          </span>
        </v-col>
      </v-row>
    </app-card>
  </router-link>
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
