import { Injectable } from '@nestjs/common';
import { FinnhubService } from './finnhub/finnhub.service';
import { CandleData, Quote, DataSource } from './api';
import { YahooService } from './yahoo/yahoo.service';

@Injectable()
export class QuoteService {

  constructor(
    private readonly finnhubService: FinnhubService,
    private readonly yahooService: YahooService
  ) {}

  async getCandles(ticker: string): Promise<CandleData> {
    return await this.finnhubService.getCandles(ticker);
  }

  async getQuote(ticker: string, source: DataSource = 'finnhub'): Promise<Quote> {

    // TODO: Dynamically pick me, and fall back if we're over a rate limit
    if (source === 'finnhub') {
      return await this.finnhubService.getQuote(ticker);
    }
    return await this.yahooService.getQuote(ticker);
  }
}
