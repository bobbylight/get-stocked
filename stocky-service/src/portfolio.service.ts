import { Injectable } from '@nestjs/common';
import { Portfolio } from './api';

@Injectable()
export class PortfolioService {

  async getPortfolio(): Promise<Portfolio> {

    return Promise.resolve({
      securities: [
        {
          name: 'Apple',
          ticker: 'AAPL',
        },
        {
          name: 'G1 Therapeutics',
          ticker: 'GTHX',
        },
        {
          name: 'Crispr Therapeutics',
          ticker: 'CRSP',
        },
        {
          name: 'Abbvie',
          ticker: 'ABBV',
        },
        {
          name: 'Vanguard S&P 500 ETF',
          ticker: 'VOO',
        },
        {
          name: 'Wilderhill Clean Energy',
          ticker: 'PBW',
        },
      ],
    });
  }
}
