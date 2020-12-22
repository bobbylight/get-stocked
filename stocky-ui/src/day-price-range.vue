<template>
  <canvas ref="canvas" class="day-price-range" width="160" height="60">
  </canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Quote } from '../../stocky-service/src/api';

@Component({})
export default class DayPriceRange extends Vue {

  @Prop({ required: true })
  quote!: Quote;

  public mounted() {
    this.redraw();
  }

  @Watch('quote')
  onQuoteChanged() {
    console.log('quote updated!');
    this.redraw();
  }

  private redraw() {

    const canvas: HTMLCanvasElement = this.$refs['canvas'] as HTMLCanvasElement;
    const g: CanvasRenderingContext2D = canvas.getContext('2d')!;

    const w: number = canvas.width;
    const h: number = canvas.height;
    let y: number = h / 2;

    // Main grey line
    g.strokeStyle = '#e0e0e0';
    g.strokeRect(0, y, w, 1);

    if (!this.quote) {
      return;
    }

    // Min and max labels
    const lowLabel: string = this.quote.low.toFixed(2);
    const highLabel: string = this.quote.high.toFixed(2);
    g.font = '10px Arial';
    let x: number = w - g.measureText(highLabel).width;
    y += 12;
    g.fillStyle = '#808080'
    g.fillText(highLabel, x, y);
    g.fillText(lowLabel, 0, y);

    // Open/closed range
    const low: number = Math.min(this.quote.open, this.quote.current);
    const high: number = Math.max(this.quote.open, this.quote.current);
    const x1: number = (low - this.quote.low) / (this.quote.high - this.quote.low) * w;
    const x2: number = (high - this.quote.low) / (this.quote.high - this.quote.low) * w;
    g.strokeStyle = '#1976d2';
    y -= 12;
    g.strokeRect(x1, y, x2 - x1, 1);

    // Pointer
    g.fillStyle = '#1976d2';
    x = low === this.quote.current ? x1 : x2;
    y -= 4;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 3, y - 5);
    g.lineTo(x - 3, y - 5);
    g.lineTo(x, y);
    g.closePath();
    g.fill();
  }
}
</script>

<style lang="less">
.day-price-range {

  width: 160px;
  height: 60px;
}
</style>
