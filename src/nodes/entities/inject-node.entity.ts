import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';

export type InjectNodeDocument = InjectNode & Document

@Schema()
export class InjectNode {
  @Prop()
  data: string;
  
  @Prop()
  repeat: number;
  
  run: Function;
}

export const InjectNodeSchema = SchemaFactory.createForClass(InjectNode);

InjectNodeSchema.methods.run = function (socket: Socket, data) {
  data = this.get('data')
  return data
}