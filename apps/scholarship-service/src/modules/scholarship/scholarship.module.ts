import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScholarshipService } from './application/services/scholarship.service';
import { ScholarshipTypeOrmEntity } from './infrastructure/persistence/typeorm/entities/scholarship.typeorm-entity';
import { scholarshipRepositoryProvider } from './infrastructure/persistence/typeorm/repositories/scholarship-repository.provider';
import { ScholarshipTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/scholarship-typeorm.repository';
import { ScholarshipController } from './presentation/controllers/scholarship.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScholarshipTypeOrmEntity])],
  controllers: [ScholarshipController],
  providers: [
    ScholarshipService,
    ScholarshipTypeOrmRepository,
    scholarshipRepositoryProvider,
  ],
  exports: [ScholarshipService],
})
export class ScholarshipModule {}
