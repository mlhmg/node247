import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';

export type FunctionNodeDocument = FunctionNode & Document

@Schema()
export class FunctionNode {
  @Prop()
  data: string;

  @Prop()
  code: string;

  run: Function;
}

export const FunctionNodeSchema = SchemaFactory.createForClass(FunctionNode);

FunctionNodeSchema.methods.run = function (client: Socket, data) {
  let result: any = eval(this.get('code'));
  return result
}