import { Scholarship } from '../entities/scholarship.entity';
import { ScholarshipStatus } from '../enums/scholarship-status.enum';

export const SCHOLARSHIP_REPOSITORY = 'SCHOLARSHIP_REPOSITORY';

export interface UpdateScholarshipData {
  studentId?: string;
  scholarshipType?: string;
  reason?: string;
  status?: ScholarshipStatus;
}

export interface ScholarshipRepository {
  create(scholarship: Scholarship): Promise<Scholarship>;
  findAll(): Promise<Scholarship[]>;
  findById(id: string): Promise<Scholarship | null>;
  update(id: string, data: UpdateScholarshipData): Promise<Scholarship | null>;
  updateStatus(id: string, status: ScholarshipStatus): Promise<Scholarship | null>;
  delete(id: string): Promise<boolean>;
}
