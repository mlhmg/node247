import { Module } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Node, NodeSchema } from './entities/node.entity';
import { DebugNode, DebugNodeSchema } from './entities/debug-node.entity';
import { FunctionNode, FunctionNodeSchema } from './entities/function-node.entity';
import { InjectNode, InjectNodeSchema } from './entities/inject-node.entity';
import { MQTTNode, MQTTNodeSchema } from './entities/mqtt-node.entity';
import { WebsocketNode, WebsocketNodeSchema } from './entities/websocket-node.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Node.name,
        schema: NodeSchema,
        discriminators: [
          { name: DebugNode.name, schema: DebugNodeSchema },
          { name: FunctionNode.name, schema: FunctionNodeSchema },
          { name: InjectNode.name, schema: InjectNodeSchema },
          { name: MQTTNode.name, schema: MQTTNodeSchema },
          { name: WebsocketNode.name, schema: WebsocketNodeSchema },
        ]
      }
    ])
  ],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService]
})

export class NodesModule {}
