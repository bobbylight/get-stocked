import { HttpService, Injectable } from '@nestjs/common';
import { CandleData, Quote } from '../api';
import { AxiosResponse } from 'axios';
import { FinnhubModels } from './finnhub.models';
import { ConfigService } from '../config.service';

const API_ROOT = 'https://finnhub.io/api/v1';

@Injectable()
export class FinnhubService {

  private readonly token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.token = configService.getValue('finnhub', 'token');
  }

  async getQuote(ticker: string): Promise<Quote> {

    const url: string = `${API_ROOT}/quote?symbol=${ticker}&token=${this.token}`;
    console.log(`Calling: ${url}`);

    return this.httpService.get(url)
      .toPromise()
      .then((response: AxiosResponse<FinnhubModels>) => {
        console.log(response.data);
        return response;
      })
      .then((response: AxiosResponse<FinnhubModels>) => {
        return {
          security: ticker.toUpperCase(),
          current: response.data.c,
          high: response.data.h,
          low: response.data.l,
          open: response.data.o,
          previousClose: response.data.pc,
          timestamp: response.data.t,
          source: 'finnhub'
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
    url += `&token=${this.token}`;

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
