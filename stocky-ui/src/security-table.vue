<template>
  <v-data-table
  :headers="headers"
  :items="tableRows"
  :single-select="true"
  show-select
  item-key="ticker"
  :search="filter"
  class="security-table elevation-1"
  >
    <template v-slot:item.price="{ item }">
      <div class="emphasized float-right">
        {{ item.price | price }}
      </div>
    </template>
    <template v-slot:item.change="{ item }">
      <div :class="{ 'positive': item.change &gt; 0, 'negative': item.change &lt; 0 }" class="emphasized float-right">
        {{ item.change | change }}
      </div>
    </template>
    <template v-slot:item.percentChange="{ item }">
      <div :class="{ 'positive': item.change &gt; 0, 'negative': item.change &lt; 0 }" class="emphasized float-right">
        {{ item.percentChange | percentChange }}
      </div>
    </template>
    <template v-slot:item.dayRange="{ item }">
      <day-price-range :quote="item.dayRange"/>
    </template>
    <template v-slot:item.time="{ item }">
      <div>
        {{ item.time | time }}
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SecurityTile from '@/security-tile.vue';
import restApi from './rest-api';
import { Portfolio, Quote, Security } from '../../stocky-service/src/api';
import { Prop } from 'vue-property-decorator';
import DayPriceRange from '@/day-price-range.vue';

interface RowData {
  ticker: string;
  price?: number;
  change?: number;
  percentChange?: number;
  dayRange?: Quote;
  time?: number;
}

const options: any = {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat([], options);

@Component({
  components: { DayPriceRange, SecurityTile },
  filters: {
    price: (value: number | undefined) => {
      return value ? value.toFixed(2) : '';
    },
    change: (value: number | undefined) => {
      return value ? (value > 0 ? '+' : '') + value.toFixed(2) : '';
    },
    percentChange: (value: number | undefined) => {
      return value ? (value > 0 ? '+' : '') + value.toFixed(2) + '%' : '';
    },
    time: (value: number | undefined) => {
      return value ? formatter.format(new Date(value * 1000)) : '';
    },
  },
})
export default class SecurityTable extends Vue {

  securities: Security[] = [];
  public tableRows: RowData[] = [];

  @Prop({ required: true })
  public filter!: string;

  public mounted() {

    restApi.getPortfolio().then((portfolio: Portfolio) => {
      this.securities = portfolio.securities;
      this.refreshValues();
    });
  }

  get headers(): any {
    return [
      {
        text: 'Ticker',
        value: 'ticker',
      },
      {
        text: 'Price',
        value: 'price',
      },
      {
        text: 'Change',
        value: 'change',
      },
      {
        text: '% Change',
        value: 'percentChange',
      },
      {
        text: 'Day Range',
        value: 'dayRange',
      },
      {
        text: 'Time (Eastern)',
        value: 'time',
      },

    ];
  }

  private refreshValues() {

    const newData: RowData[] = this.securities.map((security: Security) => {
      return {
        ticker: security.ticker,
      };
    });
    this.tableRows = newData;

    this.securities.forEach((security: Security) => {

      // Random time between 1 and 3 seconds
      const randomDelay = (Math.floor(Math.random() * 3) + 1) * 1000;

      setTimeout(() => {
        restApi.getPrice(security.ticker)
            .then((quote: Quote) => {
              this.$nextTick(() => {

                const index: number = newData.findIndex((row: RowData) => row.ticker === quote.security)!;
                const newRecord: RowData = {
                  ticker: quote.security,
                  price: quote.current,
                  change: quote.current - quote.previousClose,
                  percentChange: (quote.current - quote.previousClose) / quote.previousClose * 100,
                  dayRange: quote,
                  time: quote.timestamp,
                };

                const newNewData: RowData[] = this.tableRows.slice();
                newNewData[index] = newRecord;
                this.tableRows = newNewData;
              });
            });
      }, randomDelay);
    });

  }
}
</script>

<style lang="less">
.security-table {

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }

  .emphasized {
    font-weight: bold;
  }
}
</style>
