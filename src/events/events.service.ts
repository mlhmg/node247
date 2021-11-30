import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { Socket } from 'socket.io';
import { CanvasDocument } from 'src/canvases/entities/canvas.entity';
import { NodeExecuteDto } from './dto/node-execute.dto';
import { NodeKindDocument } from './events.gateway';


export function filterNodes(incomingNodeId: number, nodes: NodeKindDocument[]) {
    let filteredNodes: NodeKindDocument[];
    let remainingNodes: NodeKindDocument[];

    for (let node of nodes) {
      if (node.get("connectionsIn").length) {
        if (node.get("connectionsIn").includes(incomingNodeId)) {
          filteredNodes.push(node);
        } else {
          remainingNodes.push(node);
        }
      } else {
        if (incomingNodeId === -1) {
          filteredNodes.push(node);
        } else {
          remainingNodes.push(node);
        }
      }
    }

    return [
      filteredNodes,
      remainingNodes
    ]
  }

@Injectable()
export class EventsService {
  constructor(private eventEmitter: EventEmitter2) {}

  deploy(client: Socket, canvas: CanvasDocument, nodes: NodeKindDocument[]): void {
    let [filteredNodes, remainingNodes] = filterNodes(-1, nodes);

    let payload = new NodeExecuteDto();
    payload.currentData = "{}";
    payload.currentNodes = filteredNodes;
    payload.remainingNodes = remainingNodes;

    this.eventEmitter.emit("node.execute", payload, client, this.eventEmitter);
    // Steps:
    // 1. Filter array to retrieve items that doesnt has input nodes
    // 2. Loop the filtered array to execute command in that node then loop  
  }
}
