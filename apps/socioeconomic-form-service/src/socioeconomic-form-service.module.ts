import { Module } from '@nestjs/common';
import { SocioeconomicFormServiceController } from './socioeconomic-form-service.controller';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';

@Module({
  imports: [],
  controllers: [SocioeconomicFormServiceController],
  providers: [SocioeconomicFormServiceService],
})
export class SocioeconomicFormServiceModule {}
