import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Schema as mongooseSchema} from 'mongoose';
import { Socket } from 'socket.io';
import { MQTTBroker } from './mqtt-broker.entity';

export type MQTTNodeDocument = MQTTNode & Document

@Schema()
export class MQTTNode {
  @Prop()
  topic: string;

  @Prop()
  qos: number;

  @Prop()
  outputType: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'MQTTBroker'})
  broker: MQTTBroker;

  run: Function
}

export const MQTTNodeSchema = SchemaFactory.createForClass(MQTTNode);

MQTTNodeSchema.methods.run = function (socket: Socket, data) {
  data = this.get('data')
  return data
}