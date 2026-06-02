import { Test, TestingModule } from '@nestjs/testing';
import { SocioeconomicFormServiceController } from './socioeconomic-form-service.controller';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';

describe('SocioeconomicFormServiceController', () => {
  let socioeconomicFormServiceController: SocioeconomicFormServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocioeconomicFormServiceController],
      providers: [SocioeconomicFormServiceService],
    }).compile();

    socioeconomicFormServiceController = app.get<SocioeconomicFormServiceController>(SocioeconomicFormServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(socioeconomicFormServiceController.getHello()).toBe('Hello World!');
    });
  });
});
