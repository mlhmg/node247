import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';

export type DebugNodeDocument = DebugNode & Document

@Schema()
export class DebugNode {
  @Prop()
  data: string;

  @Prop()
  repeat: number;

  run: Function;
}

export const DebugNodeSchema = SchemaFactory.createForClass(DebugNode)

DebugNodeSchema.methods.run = function (client: Socket, data) {
  client.emit(data)
  return data
}