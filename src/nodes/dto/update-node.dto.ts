import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsHexadecimal } from 'class-validator';
import { DebugNode } from '../entities/debug-node.entity';
import { FunctionNode } from '../entities/function-node.entity';
import { InjectNode } from '../entities/inject-node.entity';
import { MQTTNode } from '../entities/mqtt-node.entity';
import { WebsocketNode } from '../entities/websocket-node.entity';
import { DebugNodeDto, FunctionNodeDto, InjectNodeDto, MQTTNodeDto, NodeDto, WebsocketNodeDto } from './create-node.dto';

export class UpdateNodeDto {}

class UpdateDebugNodeDto extends PartialType(DebugNodeDto) {
  @IsHexadecimal()
  _id: string;
}

class UpdateFunctionNodeDto extends PartialType(FunctionNodeDto) {
  @IsHexadecimal()
  _id: string;
}

class UpdateInjectNodeDto extends PartialType(InjectNodeDto) {
  @IsHexadecimal()
  _id: string;
}

class UpdateMQTTNodeDto extends PartialType(MQTTNodeDto) {
  @IsHexadecimal()
  _id: string;
}

class UpdateWebsocketNodeDto extends PartialType(WebsocketNodeDto) {
  @IsHexadecimal()
  _id: string;
}

export class BulkUpdateNodeDto {
  @Type(() => NodeDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: UpdateDebugNodeDto, name: DebugNode.name },
        { value: UpdateFunctionNodeDto, name: FunctionNode.name },
        { value: UpdateInjectNodeDto, name: InjectNode.name },
        { value: UpdateMQTTNodeDto, name: MQTTNode.name },
        { value: UpdateWebsocketNodeDto, name: WebsocketNode.name },
      ]
    }
  })
  nodes: NodeDto[]
} 
