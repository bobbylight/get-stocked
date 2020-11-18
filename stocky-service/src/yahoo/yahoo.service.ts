import { HttpService, Injectable } from '@nestjs/common';
import { CandleData, Quote } from '../api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ConfigService } from '../config.service';
import { Statistics } from './yahoo.models';

const API_ROOT = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com';

@Injectable()
export class YahooService {

  private readonly headers: any;

  constructor(
    readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {

    const token: string = configService.getValue('yahoo', 'token');

    this.headers = {
      'x-rapidapi-key': token,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
    }
  }

  async getQuote(ticker: string): Promise<Quote> {

    const url: string = `${API_ROOT}/stock/v2/get-statistics`;
    console.log(`Calling: ${url}`);

    const config: AxiosRequestConfig = {
      params: {
        symbol: ticker
      },
      headers: this.headers
    };

    return this.httpService.get(url, config)
      .toPromise()
      .then((response: AxiosResponse<Statistics>) => {
        console.log(response.data);
        return response;
      })
      .then((response: AxiosResponse<Statistics>) => {
        return {
          security: ticker.toUpperCase(),
          current: response.data.price.regularMarketPrice.raw,
          high: response.data.price.regularMarketDayHigh.raw,
          low: response.data.price.regularMarketDayLow.raw,
          open: response.data.price.regularMarketOpen.raw,
          previousClose: response.data.price.regularMarketPreviousClose.raw,
          timestamp: response.data.price.regularMarketTime,
          source: 'yahoo'
        };
      });
  }

  async getCandles(ticker: string): Promise<CandleData> {

    const resolution: string = 'M';

    let now: Date = new Date();
    const to: number = Math.trunc(now.getTime() / 1000);
    //const to: number = new Date('2020-10-09T13:00:00Z').getTime() / 1000;

    //const from: number = new Date('2020-10-08T12:00:00Z').getTime() / 1000;
    const from: number = Math.trunc(now.setFullYear(now.getFullYear() - 1) / 1000);

    let url: string = `${API_ROOT}/stock/candle?symbol=${ticker}&resolution=${resolution}`;
    url += `&from=${from}&to=${to}`;
    url += `&token=${from}`;

    console.log(`Calling: ${url}`);

    return this.httpService.get(url)
      .toPromise()
      .then((response: AxiosResponse<CandleData>) => {
        console.log(response.data);
        return response;
      })
      .then((response: AxiosResponse<CandleData>) => {
        return response.data;
      });
  }
}
