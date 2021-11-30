import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';

export type MQTTBrokerDocument = MQTTBroker & Document

@Schema()
export class MQTTBroker {
  @Prop()
  name: string;

  @Prop()
  server: string;

  @Prop()
  tls: string;

  @Prop()
  port: number;

  @Prop()
  protocol: number;

  @Prop()
  username: string;

  @Prop()
  password: string;

  run: Function;
}

export const MQTTBrokerSchema = SchemaFactory.createForClass(MQTTBroker);

MQTTBrokerSchema.methods.run = function (socket: Socket, data) {
  return data
}