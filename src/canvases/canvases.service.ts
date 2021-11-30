import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCanvasDto } from './dto/create-canvas.dto';
import { UpdateCanvasDto } from './dto/update-canvas.dto';
import { Canvas, CanvasDocument } from './entities/canvas.entity';

@Injectable()
export class CanvasesService {
  constructor(
    @InjectModel(Canvas.name)
    private canvasModel: Model<CanvasDocument>
  ) {}

  create(createCanvasDto: CreateCanvasDto) {
    let createdCanvas = new this.canvasModel(createCanvasDto);
    createdCanvas.save();
    return 'This action adds a new canvase';
  }

  findAll() {
    return this.canvasModel.find();
  }

  findOne(id: string) {
    return this.canvasModel.findById(id);
  }

  update(id: number, updateCanvasDto: UpdateCanvasDto) {
    return `This action updates a #${id} canvase`;
  }

  remove(id: number) {
    return `This action removes a #${id} canvase`;
  }
}
