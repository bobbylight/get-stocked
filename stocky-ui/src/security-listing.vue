<template>
  <v-container style="width: 800px">
    <v-row justify="center">
      <security-tile v-for="security in securities"
                     :key="security.ticker"
                     :security="security"/>

      <v-card>
        <v-card-title>
          Securities
          <v-spacer/>
          <v-text-field
            v-model="filter"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <security-table :filter="filter"/>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SecurityTile from '@/security-tile.vue';
import restApi from './rest-api';
import { Portfolio, Security } from '../../stocky-service/src/api';
import SecurityTable from '@/security-table.vue';

@Component({ components: { SecurityTable, SecurityTile } })
export default class SecurityListing extends Vue {

  public securities: Security[] = [];

  public filter: string = "";

  public mounted() {
    restApi.getPortfolio().then((portfolio: Portfolio) => {
      this.securities = portfolio.securities;
    });
  }
}
</script>
