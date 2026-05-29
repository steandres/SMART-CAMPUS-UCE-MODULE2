import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ScholarshipStatus } from '../../domain/enums/scholarship-status.enum';

export class CreateScholarshipDto {
  @IsUUID()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  scholarshipType: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsEnum(ScholarshipStatus)
  status: ScholarshipStatus;
}
