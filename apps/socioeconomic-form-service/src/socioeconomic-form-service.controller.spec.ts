import { Test, TestingModule } from '@nestjs/testing';
import { SocioeconomicFormServiceController } from './socioeconomic-form-service.controller';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';

describe('SocioeconomicFormServiceController', () => {
  let socioeconomicFormServiceController: SocioeconomicFormServiceController;
  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByStudent: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocioeconomicFormServiceController],
      providers: [
        {
          provide: SocioeconomicFormServiceService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    socioeconomicFormServiceController = app.get<SocioeconomicFormServiceController>(SocioeconomicFormServiceController);
  });

  describe('findAll', () => {
    it('should return socioeconomic forms', async () => {
      const forms = [{ studentId: 'student-1' }];
      serviceMock.findAll.mockResolvedValue(forms);

      await expect(socioeconomicFormServiceController.findAll()).resolves.toEqual(forms);
      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
