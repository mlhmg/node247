import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CanvasesService } from 'src/canvases/canvases.service';
import { CanvasDocument } from 'src/canvases/entities/canvas.entity';
import { DebugNodeDocument } from 'src/nodes/entities/debug-node.entity';
import { FunctionNodeDocument } from 'src/nodes/entities/function-node.entity';
import { InjectNodeDocument } from 'src/nodes/entities/inject-node.entity';
import { MQTTNodeDocument } from 'src/nodes/entities/mqtt-node.entity';
import { NodeDocument } from 'src/nodes/entities/node.entity';
import { WebsocketNodeDocument } from 'src/nodes/entities/websocket-node.entity';
import { NodesService } from 'src/nodes/nodes.service';
import { DeployDto } from './dto/deploy.dto';
import { EventsService } from './events.service';

export type NodeKindDocument = DebugNodeDocument | FunctionNodeDocument | InjectNodeDocument | MQTTNodeDocument | WebsocketNodeDocument;
  // let debug: NodeKind = node as NodeKind
  // debug.run()
@WebSocketGateway({namespace: 'events'})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly eventsService: EventsService,
    private readonly nodeService: NodesService,
    private readonly canvasesService: CanvasesService
  ) {}

  @SubscribeMessage('deploy')
  async handleDeploy(
    @MessageBody() data: DeployDto,
    @ConnectedSocket() client: Socket
  ) {
    let canvas: CanvasDocument = await this.canvasesService.findOne(data.canvasId);

    if (canvas != null) {
      client.join(canvas.id);
      let nodes: unknown[] = await this.nodeService.findByCanvasId(canvas.id);
      this.eventsService.deploy(client, nodes as NodeKindDocument[]);
    }

  }
}
