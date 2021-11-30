import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';

@Controller('canvases')
export class CanvasesController {
  constructor(private readonly canvasesService: CanvasesService) {}

  @Post()
  create(@Body() createCanvasDto: CreateCanvasDto) {
    return this.canvasesService.create(createCanvasDto);
  }

  @Get()
  findAll() {
    return this.canvasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanvasDto: UpdateCanvasDto) {
    return this.canvasesService.update(+id, updateCanvasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvasesService.remove(+id);
  }
}
