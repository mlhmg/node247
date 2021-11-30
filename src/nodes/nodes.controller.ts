import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { BulkCreateNodeDto } from './dto/create-node.dto';
import { BulkUpdateNodeDto, UpdateNodeDto } from './dto/update-node.dto';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() bulkCreateNodeDto: BulkCreateNodeDto) {
    return this.nodesService.create(bulkCreateNodeDto);
  }

  @Get()
  findAll() {
    return this.nodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nodesService.findOne(id);
  }

  @Patch()
  update(@Body() bulkUpdateNodeDto: BulkUpdateNodeDto) {
    return this.nodesService.update(bulkUpdateNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodesService.remove(+id);
  }
}
