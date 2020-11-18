import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './app.controller';
import { QuoteService } from './app.service';

describe('AppController', () => {
  let appController: QuoteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteService],
    }).compile();

    appController = app.get<QuoteController>(QuoteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
