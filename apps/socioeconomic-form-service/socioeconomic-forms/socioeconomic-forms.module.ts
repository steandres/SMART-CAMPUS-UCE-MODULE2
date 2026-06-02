import { Module } from '@nestjs/common';
import { SocioeconomicFormsService } from './socioeconomic-forms.service';
import { SocioeconomicFormsController } from './socioeconomic-forms.controller';

@Module({
  controllers: [SocioeconomicFormsController],
  providers: [SocioeconomicFormsService],
})
export class SocioeconomicFormsModule {}
