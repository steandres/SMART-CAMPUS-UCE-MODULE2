import { PartialType } from '@nestjs/mapped-types';
import { CreateSocioeconomicFormDto } from './create-socioeconomic-form.dto';

export class UpdateSocioeconomicFormDto extends PartialType(CreateSocioeconomicFormDto) {}
