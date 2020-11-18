<template>
  <v-container style="width: 800px">
    <v-row justify="center">
      <security-tile v-for="security in securities"
                     :security="security"/>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SecurityTile from '@/security-tile.vue';
import restApi from './rest-api';
import { Portfolio } from '../../stocky-service/src/models/portfolio';
import { Security } from '../../stocky-service/src/models/security';

@Component({ components: { SecurityTile } })
export default class SecurityListing extends Vue {

  public securities: Security[] = [];

  public mounted() {
    restApi.getPortfolio().then((portfolio: Portfolio) => {
      this.securities = portfolio.securities;
    });
  }
}
</script>
