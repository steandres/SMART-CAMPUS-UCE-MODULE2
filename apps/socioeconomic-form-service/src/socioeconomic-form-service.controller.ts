import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Socioeconomic Forms') // Esto lo agrupa en Swagger
@Controller('socioeconomic-forms')
export class SocioeconomicFormServiceController {
  constructor(private readonly service: SocioeconomicFormServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ficha socioeconómica' })
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las fichas socioeconómicas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ficha por su ID de MongoDB' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Obtener la ficha de un estudiante usando su studentId' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.service.findByStudent(studentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una ficha por su ID' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ficha por su ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}