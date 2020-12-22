<template>
  <v-col cols="12" class="security-tile">

    <v-card>
      <v-card-title :class="isUpOrDown">
          {{security.name}}
      </v-card-title>
      <v-card-subtitle>
        {{security.ticker}}
      </v-card-subtitle>
      <div class="security-price" v-if="quote" :class="isUpOrDown">
        <div>
          {{ quote.current }}
        </div>
        <div>
          {{ delta }} ({{ deltaPercent }}%)
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Quote, Security } from '../../stocky-service/src/api';

@Component
export default class SecurityTile extends Vue {

  @Prop({ required: true })
  public security!: Security;

  private quote: Quote | null = null;

  public mounted() {
    //
    // // Random time between 1 and 3 seconds
    // const randomDelay = (Math.floor(Math.random() * 3) + 1) * 1000;
    //
    // setTimeout(() => {
    //   restApi.getPrice(this.security.ticker)
    //     .then((quote: Quote) => {
    //       this.quote = quote;
    //     });
    // }, randomDelay);
  }

  private get delta(): number | string {
    if (!this.quote) {
      return '';
    }
    return (this.quote.current - this.quote.previousClose).toFixed(2);
  }

  private get deltaPercent(): string {
    if (!this.quote) {
      return '';
    }
    return ((this.delta as number / this.quote.previousClose) * 100).toFixed(2);
  }

  private get isUpOrDown(): string {
    if (!this.quote) {
      return '';
    }
    return this.quote.current >= this.quote.previousClose ? 'up' : 'down';
  }
}
</script>

<style lang="less" scoped>
.security-tile {

  .up {
    color: darkgreen !important;
  }

  .down {
    color: crimson !important;
  }

  .security-price {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
