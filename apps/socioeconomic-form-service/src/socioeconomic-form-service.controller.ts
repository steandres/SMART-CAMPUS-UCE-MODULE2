import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SocioeconomicFormServiceService } from './socioeconomic-form-service.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Socioeconomic Forms')
@Controller('socioeconomic-forms')
export class SocioeconomicFormServiceController {
  constructor(private readonly service: SocioeconomicFormServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a socioeconomic form' })
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all socioeconomic forms' })
  findAll() {
    return this.service.findAll();
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get a socioeconomic form by student id' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.service.findByStudent(studentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a socioeconomic form by MongoDB id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a socioeconomic form by id' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a socioeconomic form by id' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
