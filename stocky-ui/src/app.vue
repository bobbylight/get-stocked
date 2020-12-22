<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1>Stocky</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <security-listing/>

      <candle-chart ticker="INX"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import SecurityListing from './security-listing.vue';
import CandleChart from '@/candle-chart.vue';
import SecurityTable from '@/security-table.vue';

export default Vue.extend({
  name: 'App',

  components: {
    CandleChart,
    SecurityListing,
    SecurityTable,
  },

  data: () => ({
    filter: 'a'
  }),
});
</script>
