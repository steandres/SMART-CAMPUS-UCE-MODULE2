import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ScholarshipRepository,
  UpdateScholarshipData,
} from '../../../../domain/repositories/scholarship.repository';
import { Scholarship } from '../../../../domain/entities/scholarship.entity';
import { ScholarshipStatus } from '../../../../domain/enums/scholarship-status.enum';
import { ScholarshipTypeOrmEntity } from '../entities/scholarship.typeorm-entity';

@Injectable()
export class ScholarshipTypeOrmRepository implements ScholarshipRepository {
  constructor(
    @InjectRepository(ScholarshipTypeOrmEntity)
    private readonly repository: Repository<ScholarshipTypeOrmEntity>,
  ) {}

  async create(scholarship: Scholarship): Promise<Scholarship> {
    const persistenceEntity = this.toPersistence(scholarship);
    const savedEntity = await this.repository.save(persistenceEntity);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<Scholarship[]> {
    const entities = await this.repository.find({ order: { createdAt: 'DESC' } });
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<Scholarship | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(
    id: string,
    data: UpdateScholarshipData,
  ): Promise<Scholarship | null> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing) {
      return null;
    }

    const merged = this.repository.merge(existing, data);
    const savedEntity = await this.repository.save(merged);
    return this.toDomain(savedEntity);
  }

  async updateStatus(
    id: string,
    status: ScholarshipStatus,
  ): Promise<Scholarship | null> {
    const existing = await this.repository.findOne({ where: { id } });
    if (!existing) {
      return null;
    }

    existing.status = status;
    const savedEntity = await this.repository.save(existing);
    return this.toDomain(savedEntity);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  private toDomain(entity: ScholarshipTypeOrmEntity): Scholarship {
    return new Scholarship(
      entity.id,
      entity.studentId,
      entity.scholarshipType,
      entity.reason,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toPersistence(
    scholarship: Scholarship,
  ): Partial<ScholarshipTypeOrmEntity> {
    return {
      id: scholarship.id,
      studentId: scholarship.studentId,
      scholarshipType: scholarship.scholarshipType,
      reason: scholarship.reason,
      status: scholarship.status,
      createdAt: scholarship.createdAt,
      updatedAt: scholarship.updatedAt,
    };
  }
}
