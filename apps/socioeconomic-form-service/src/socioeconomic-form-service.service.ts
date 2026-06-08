import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SocioeconomicForm, SocioeconomicFormDocument } from './socioeconomic-form.schema';

@Injectable()
export class SocioeconomicFormServiceService {
  constructor(
    @InjectModel(SocioeconomicForm.name) 
    private socioeconomicFormModel: Model<SocioeconomicFormDocument>,
  ) {}

  async create(createDto: any): Promise<SocioeconomicForm> {
    const newForm = new this.socioeconomicFormModel(createDto);
    return newForm.save();
  }

  async findAll(): Promise<SocioeconomicForm[]> {
    return this.socioeconomicFormModel.find().exec();
  }

  async findOne(id: string): Promise<SocioeconomicForm> {
    const form = await this.socioeconomicFormModel.findById(id).exec();
    if (!form) {
      throw new NotFoundException(`Socioeconomic form with id ${id} was not found`);
    }
    return form;
  }

  async findByStudent(studentId: string): Promise<SocioeconomicForm> {
    const form = await this.socioeconomicFormModel.findOne({ studentId }).exec();
    if (!form) {
      throw new NotFoundException(
        `Socioeconomic form for student ${studentId} was not found`,
      );
    }
    return form;
  }

  async update(id: string, updateDto: any): Promise<SocioeconomicForm> {
    const updatedForm = await this.socioeconomicFormModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updatedForm) {
      throw new NotFoundException(`Socioeconomic form with id ${id} was not found`);
    }
    return updatedForm;
  }

  async remove(id: string): Promise<any> {
    const result = await this.socioeconomicFormModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Socioeconomic form with id ${id} was not found`);
    }
    return { message: 'Socioeconomic form deleted successfully' };
  }
}
