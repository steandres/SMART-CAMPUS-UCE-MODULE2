import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SocioeconomicFormDocument = SocioeconomicForm & Document;

@Schema({ timestamps: true })
export class SocioeconomicForm {
  @Prop({ required: true })
  studentId!: string;

  @Prop({ required: true })
  familyIncome!: number;

  @Prop({ required: true })
  housingType!: string;

  @Prop({ required: true })
  familyMembers!: number;

  @Prop({ required: true })
  employmentStatus!: string;

  @Prop({ required: true })
  vulnerabilityFactors!: string;

  @Prop({ required: true })
  observations!: string;

}

export const SocioeconomicFormSchema = SchemaFactory.createForClass(SocioeconomicForm);