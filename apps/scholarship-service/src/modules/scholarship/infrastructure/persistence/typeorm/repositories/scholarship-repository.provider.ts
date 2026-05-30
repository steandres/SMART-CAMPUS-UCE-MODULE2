import { Provider } from '@nestjs/common';
import { SCHOLARSHIP_REPOSITORY } from '../../../../domain/repositories/scholarship.repository';
import { ScholarshipTypeOrmRepository } from './scholarship-typeorm.repository';

export const scholarshipRepositoryProvider: Provider = {
  provide: SCHOLARSHIP_REPOSITORY,
  useClass: ScholarshipTypeOrmRepository,
};
