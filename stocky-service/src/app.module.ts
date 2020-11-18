import { HttpModule, Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { FinnhubService } from './finnhub/finnhub.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { YahooService } from './yahoo/yahoo.service';
import { ConfigService } from './config.service';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/'
    })
  ],
  controllers: [QuoteController, PortfolioController],
  providers: [ConfigService, FinnhubService, PortfolioService, QuoteService, YahooService],
})
export class AppModule {}
