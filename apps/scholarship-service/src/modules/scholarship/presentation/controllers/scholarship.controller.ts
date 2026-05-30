import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ScholarshipService } from '../../application/services/scholarship.service';
import { CreateScholarshipDto } from '../../application/dtos/create-scholarship.dto';
import { UpdateScholarshipDto } from '../../application/dtos/update-scholarship.dto';
import { UpdateScholarshipStatusDto } from '../../application/dtos/update-scholarship-status.dto';
import { Scholarship } from '../../domain/entities/scholarship.entity';

@Controller('scholarships')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createScholarship(
    @Body() createScholarshipDto: CreateScholarshipDto,
  ): Promise<Scholarship> {
    return this.scholarshipService.createScholarship(createScholarshipDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getScholarships(): Promise<Scholarship[]> {
    return this.scholarshipService.getScholarships();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getScholarshipById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Scholarship> {
    return this.scholarshipService.getScholarshipById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateScholarship(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateScholarshipDto: UpdateScholarshipDto,
  ): Promise<Scholarship> {
    return this.scholarshipService.updateScholarship(id, updateScholarshipDto);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  updateScholarshipStatus(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateScholarshipStatusDto: UpdateScholarshipStatusDto,
  ): Promise<Scholarship> {
    return this.scholarshipService.updateScholarshipStatus(
      id,
      updateScholarshipStatusDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteScholarship(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.scholarshipService.deleteScholarship(id);
  }
}
