import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CandleData, DataSource, Quote } from './api';

@Controller('/stocks')
export class QuoteController {

  constructor(private readonly appService: QuoteService) {}

  @Get(':ticker/candles')
  getCandles(@Param('ticker') ticker: string): Promise<CandleData> {
    return this.appService.getCandles(ticker);
  }

  @Get(':ticker/quote')
  getQuote(@Param('ticker') ticker: string, @Query('source') source?: DataSource): Promise<Quote> {
    return this.appService.getQuote(ticker, source);
  }
}
