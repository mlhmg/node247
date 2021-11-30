import { Socket } from 'socket.io';
import { NodeKindDocument } from '../events.gateway';

export class NodeExecuteDto {
  client: Socket
  currentNodes: NodeKindDocument[]
  remainingNodes: NodeKindDocument[]
  currentData: string
}