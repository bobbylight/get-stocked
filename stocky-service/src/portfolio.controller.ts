import { Controller, Get } from '@nestjs/common';
import { Portfolio } from './api';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {

  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getPortfolio(): Promise<Portfolio> {
    return await this.portfolioService.getPortfolio();
  }
}
