<template>
  <v-container style="width: 600px">
    <v-row justify="center">
      <canvas width="400" height="400" class="candle-chart" ref="chart"/>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from 'chart.js';
import Component from 'vue-class-component';
import restApi from './rest-api';
import { Prop } from 'vue-property-decorator';
import CandleData from '../../stocky-service/src/models/candle-data';

@Component
export default class CandleChart extends Vue {

  @Prop({ required: true })
  public ticker!: string;

  private value: string = '';

  public mounted() {

    restApi.getCandles(this.ticker)
        .then((data: CandleData) => {

          if ('ok' !== data.s) {
            this.value = 'No data found';
          }
          else {
            this.value = '' + data.c.length;
            this.createChart(data);
          }
        });
  }

  private createChart(data: CandleData) {

    const ctx: HTMLDivElement = this.$refs['chart'] as HTMLDivElement;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Price',
          data: data.c
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'category',
            labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
          }]
        }
      }
    });
  }
}
</script>

<style lang="less" scoped>
.candle-chart {
  width: 400px;
  height: 400px;
}
</style>
