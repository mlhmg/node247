import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { DebugNode } from './debug-node.entity';
import { InjectNode } from './inject-node.entity';
import { FunctionNode } from './function-node.entity';
import { WebsocketNode } from './websocket-node.entity';
import { MQTTNode } from './mqtt-node.entity';
import { Canvas } from 'src/canvases/entities/canvas.entity';

export type NodeDocument = Node & Document

@Schema({ discriminatorKey: 'kind' })
export class Node {

  @Prop()
  id: number;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Canvas' })
  canvas: Canvas;

  @Prop()
  name: string;

  @Prop()
  isEnable: boolean;

  @Prop({
    type: String,
    required: true,
    enum: [DebugNode.name, InjectNode.name, FunctionNode.name, WebsocketNode.name, MQTTNode.name]
  })
  kind: string;
  
  @Prop([Number])
  connectionsOut: number[];

  @Prop([Number])
  connectionsIn: number[];

  @Prop()
  positionX: number;

  @Prop()
  positionY: number;

  @Prop()
  description: string;

  run: Function;
}

export const NodeSchema = SchemaFactory.createForClass(Node);

NodeSchema.methods.run = async function (data) {
  console.log("TEST")
}