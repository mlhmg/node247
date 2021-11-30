import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { filterNodes } from '../events.service';
import { NodeExecuteDto } from '../dto/node-execute.dto'
import { Socket } from 'socket.io';


@Injectable()
export class NodeExecuteListener {
  @OnEvent('node.execute')
  handleNodeExecuteEvent(payload: NodeExecuteDto, client: Socket, eventEmitter: EventEmitter2) {
    if (payload.currentNodes.length) {
      payload.currentNodes.forEach(node => {
        let updatedData = node.run(client, payload.currentData);
        let [filteredNodes, remainingNodes] = filterNodes(node.get("id"), payload.remainingNodes);

        let newPayload = new NodeExecuteDto()
        newPayload.currentNodes = filteredNodes;
        newPayload.remainingNodes = remainingNodes;
        newPayload.currentData = updatedData;

        eventEmitter.emit("node.execute", newPayload, client, eventEmitter)
      });
    }
  }
}