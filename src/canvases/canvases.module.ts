import { Module } from '@nestjs/common';
import { CanvasesService } from './canvases.service';
import { CanvasesController } from './canvases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Canvas, CanvasSchema } from './entities/canvas.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Canvas.name,
        schema: CanvasSchema
      }
    ])
  ],
  controllers: [CanvasesController],
  providers: [CanvasesService],
  exports: [CanvasesService]
})
export class CanvasesModule {}
