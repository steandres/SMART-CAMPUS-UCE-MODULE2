import { Injectable } from '@nestjs/common';
import { CreateSocioeconomicFormDto } from './dto/create-socioeconomic-form.dto';
import { UpdateSocioeconomicFormDto } from './dto/update-socioeconomic-form.dto';

@Injectable()
export class SocioeconomicFormsService {
  create(createSocioeconomicFormDto: CreateSocioeconomicFormDto) {
    return 'This action adds a new socioeconomicForm';
  }

  findAll() {
    return `This action returns all socioeconomicForms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socioeconomicForm`;
  }

  update(id: number, updateSocioeconomicFormDto: UpdateSocioeconomicFormDto) {
    return `This action updates a #${id} socioeconomicForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} socioeconomicForm`;
  }
}
