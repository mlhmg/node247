import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { 
  IsBoolean, 
  IsHexadecimal, 
  IsIn, 
  IsJSON, 
  IsNumber, 
  IsOptional, 
  IsPositive, 
  IsString, 
  ValidateNested 
} from "class-validator";
import { DebugNode } from "../entities/debug-node.entity";
import { FunctionNode } from "../entities/function-node.entity";
import { InjectNode } from "../entities/inject-node.entity";
import { MQTTNode } from "../entities/mqtt-node.entity";
import { WebsocketNode } from "../entities/websocket-node.entity";

export class NodeDto {
  @IsHexadecimal()
  _id: string;

  @IsPositive()
  id: number;

  @IsHexadecimal()
  canvas: string;

  @IsString()
  name: string;

  @IsBoolean()
  isEnable: boolean;

  @IsIn([
    DebugNode.name, 
    FunctionNode.name, 
    InjectNode.name, 
    MQTTNode.name, 
    WebsocketNode.name
  ])
  kind: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  positionX: number;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  positionY: number;

  @IsString()
  description: string;
}

export class DebugNodeDto extends NodeDto {
  @IsJSON()
  data: string;

  @IsPositive()
  repeat: number;

  @IsPositive({
    each: true
  })
  connectionsIn: number[];
}

export class FunctionNodeDto extends NodeDto {
  @IsString()
  data: string;

  @IsString()
  code: string;

  @IsPositive({
    each: true
  })
  connectionsOut: number[];

  @IsPositive({
    each: true
  })
  connectionsIn: number[];
}

export class InjectNodeDto extends NodeDto {
  @IsString()
  data: string;

  @IsPositive()
  repeat: number;

  @IsPositive({
    each: true
  })
  connectionsOut: number[];
}

export class MQTTNodeDto extends NodeDto {
  @IsString()
  data: string;

  @IsString()
  topic: string;

  @IsPositive()
  repeat: number;

  @IsString()
  outputType: string;

  @IsOptional()
  @IsHexadecimal()
  broker: string;

  @IsPositive({
    each: true
  })
  connectionsOut: number[];
}

export class WebsocketNodeDto extends NodeDto {
  @IsPositive()
  websocketType: number;

  @IsString()
  listener: string;

  @IsPositive({
    each: true
  })
  connectionsOut: number[];
}

export class CreateNodeDto {}

class CreateDebugNodeDto extends OmitType(DebugNodeDto, ['_id'] as const) {

}

class CreateFunctionNodeDto extends OmitType(FunctionNodeDto, ['_id'] as const) {

}

class CreateInjectNodeDto extends OmitType(InjectNodeDto, ['_id'] as const) {

}

class CreateMQTTNodeDto extends OmitType(MQTTNodeDto, ['_id'] as const) {

}

class CreateWebsocketNodeDto extends OmitType(WebsocketNodeDto, ['_id'] as const) {

}

export class BulkCreateNodeDto {
  @ValidateNested()
  @Type(() => NodeDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: CreateDebugNodeDto, name: DebugNode.name },
        { value: CreateFunctionNodeDto, name: FunctionNode.name },
        { value: CreateInjectNodeDto, name: InjectNode.name },
        { value: CreateMQTTNodeDto, name: MQTTNode.name },
        { value: CreateWebsocketNodeDto, name: WebsocketNode.name },
      ]
    }
  })
  nodes: NodeDto[];
}

