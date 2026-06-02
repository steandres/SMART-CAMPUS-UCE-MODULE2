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

  // 1. Crear ficha
  async create(createDto: any): Promise<SocioeconomicForm> {
    const newForm = new this.socioeconomicFormModel(createDto);
    return newForm.save();
  }

  // 2. Obtener todas
  async findAll(): Promise<SocioeconomicForm[]> {
    return this.socioeconomicFormModel.find().exec();
  }

  // 3. Obtener por ID de la ficha
  async findOne(id: string): Promise<SocioeconomicForm> {
    const form = await this.socioeconomicFormModel.findById(id).exec();
    if (!form) throw new NotFoundException(`Ficha con ID ${id} no encontrada`);
    return form;
  }

  // 4. Buscar por ID del Estudiante (¡Este es clave para la Persona 1!)
  async findByStudent(studentId: string): Promise<SocioeconomicForm> {
    const form = await this.socioeconomicFormModel.findOne({ studentId }).exec();
    if (!form) throw new NotFoundException(`No hay ficha para el estudiante ${studentId}`);
    return form;
  }

  // 5. Actualizar por ID
  async update(id: string, updateDto: any): Promise<SocioeconomicForm> {
    const updatedForm = await this.socioeconomicFormModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updatedForm) throw new NotFoundException(`Ficha con ID ${id} no encontrada`);
    return updatedForm;
  }

  // 6. Eliminar por ID
  async remove(id: string): Promise<any> {
    const result = await this.socioeconomicFormModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Ficha con ID ${id} no encontrada`);
    return { message: 'Ficha eliminada correctamente' };
  }
}