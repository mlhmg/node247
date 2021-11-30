import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesModule } from './nodes/nodes.module';
import { CanvasesModule } from './canvases/canvases.module';
import { EventsModule } from './events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/nest"), 
    EventEmitterModule.forRoot(),
    NodesModule, CanvasesModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
