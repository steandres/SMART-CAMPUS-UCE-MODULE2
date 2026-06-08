import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocioeconomicFormServiceController } from './socioeconomic-form-service.controller';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';
import {
  SocioeconomicForm,
  SocioeconomicFormSchema,
} from './socioeconomic-form.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/socioeconomic_forms',
    ),
    MongooseModule.forFeature([
      { name: SocioeconomicForm.name, schema: SocioeconomicFormSchema },
    ]),
  ],
  controllers: [SocioeconomicFormServiceController],
  providers: [SocioeconomicFormServiceService],
})
export class SocioeconomicFormServiceModule {}
