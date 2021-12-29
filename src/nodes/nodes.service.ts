import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BulkCreateNodeDto } from './dto/create-node.dto';
import { BulkUpdateNodeDto, UpdateNodeDto } from './dto/update-node.dto';
import { DebugNode, DebugNodeDocument } from './entities/debug-node.entity';
import { FunctionNode, FunctionNodeDocument } from './entities/function-node.entity';
import { InjectNode, InjectNodeDocument } from './entities/inject-node.entity';
import { MQTTNode, MQTTNodeDocument } from './entities/mqtt-node.entity';
import { Node, NodeDocument } from './entities/node.entity';
import { WebsocketNode, WebsocketNodeDocument } from './entities/websocket-node.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name)
    private nodeModel: Model<NodeDocument>,
    @InjectModel(DebugNode.name)
    private debugNodeModel: Model<DebugNodeDocument>,
    @InjectModel(FunctionNode.name)
    private functionNodeModel: Model<FunctionNodeDocument>,
    @InjectModel(InjectNode.name)
    private injectNodeModel: Model<InjectNodeDocument>,
    @InjectModel(MQTTNode.name)
    private mqttNodeModel: Model<MQTTNodeDocument>,
    @InjectModel(WebsocketNode.name)
    private websocketNodeModel: Model<WebsocketNodeDocument>,
  ) { }

  create(bulkCreateNodeDto: BulkCreateNodeDto) {
    this.removeByCanvasId(bulkCreateNodeDto.canvas);
    for (let newNodeDto of bulkCreateNodeDto.nodes) {
      let createdNode = null;
      if (newNodeDto.kind === DebugNode.name) {
        createdNode = new this.debugNodeModel(newNodeDto);
      }
      if (newNodeDto.kind === FunctionNode.name) {
        createdNode = new this.functionNodeModel(newNodeDto);
      }
      if (newNodeDto.kind === InjectNode.name) {
        createdNode = new this.injectNodeModel(newNodeDto);
      }
      if (newNodeDto.kind === MQTTNode.name) {
        createdNode = new this.mqttNodeModel(newNodeDto);
      }
      if (newNodeDto.kind === WebsocketNode.name) {
        createdNode = new this.websocketNodeModel(newNodeDto);
      }

      if (createdNode) {
        createdNode.save();
      }
    }
    return 'Nodes created';
  }

  findAll() {
    let allNodes = this.nodeModel.find();
    return allNodes;
  }

  async findOne(id: string) {
    let node = await this.nodeModel.findOne({ _id: id });
    return node;
  }

  findByCanvasId(canvasId: string) {
    let node = this.nodeModel.find({ canvasId: canvasId });
    return node;
  }

  update(bulkUpdateNodeDto: BulkUpdateNodeDto) {
    for (let updateNodeDto of bulkUpdateNodeDto.nodes) {
      let updatedNode = null;

      if (updateNodeDto.kind === DebugNode.name) {
        updatedNode = this.debugNodeModel.updateOne({ _id: updateNodeDto._id }, updateNodeDto);
      }
      if (updateNodeDto.kind === FunctionNode.name) {
        updatedNode = this.functionNodeModel.updateOne({ _id: updateNodeDto._id }, updateNodeDto);
      }
      if (updateNodeDto.kind === InjectNode.name) {
        updatedNode = this.injectNodeModel.updateOne({ _id: updateNodeDto._id }, updateNodeDto);
      }
      if (updateNodeDto.kind === MQTTNode.name) {
        updatedNode = this.mqttNodeModel.updateOne({ _id: updateNodeDto._id }, updateNodeDto);
      }
      if (updateNodeDto.kind === WebsocketNode.name) {
        updatedNode = this.websocketNodeModel.updateOne({ _id: updateNodeDto._id }, updateNodeDto);
      }

    }
    return `This action updates some nodes`;
  }

  remove(id: string) {
    return `This action removes a #${id} node`;
  }

  async removeByCanvasId(canvasId: string) {
    let result = await this.nodeModel.deleteMany({ canvasId: canvasId });
    return result
  }
}