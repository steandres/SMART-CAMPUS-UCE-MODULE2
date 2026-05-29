import { IsEnum } from 'class-validator';
import { ScholarshipStatus } from '../../domain/enums/scholarship-status.enum';

export class UpdateScholarshipStatusDto {
  @IsEnum(ScholarshipStatus)
  status: ScholarshipStatus;
}
