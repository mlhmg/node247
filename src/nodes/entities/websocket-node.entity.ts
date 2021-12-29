import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';

export type WebsocketNodeDocument = WebsocketNode & Document

@Schema()
export class WebsocketNode {
  @Prop()
  websocketType: number;

  @Prop()
  listener: string;

  @Prop()
  client: string;

  run: Function
}

export const WebsocketNodeSchema = SchemaFactory.createForClass(WebsocketNode);

WebsocketNodeSchema.methods.run = function (client: Socket, data) {
  return data
}