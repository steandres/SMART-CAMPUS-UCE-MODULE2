import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocioeconomicFormsService } from './socioeconomic-forms.service';
import { CreateSocioeconomicFormDto } from './dto/create-socioeconomic-form.dto';
import { UpdateSocioeconomicFormDto } from './dto/update-socioeconomic-form.dto';

@Controller('socioeconomic-forms')
export class SocioeconomicFormsController {
  constructor(private readonly socioeconomicFormsService: SocioeconomicFormsService) {}

  @Post()
  create(@Body() createSocioeconomicFormDto: CreateSocioeconomicFormDto) {
    return this.socioeconomicFormsService.create(createSocioeconomicFormDto);
  }

  @Get()
  findAll() {
    return this.socioeconomicFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socioeconomicFormsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocioeconomicFormDto: UpdateSocioeconomicFormDto) {
    return this.socioeconomicFormsService.update(+id, updateSocioeconomicFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socioeconomicFormsService.remove(+id);
  }
}
