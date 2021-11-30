import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CanvasDocument = Canvas & Document;

@Schema()
export class Canvas {
  @Prop()
  createdAt: Date;
}

export const CanvasSchema = SchemaFactory.createForClass(Canvas);