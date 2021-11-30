import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { NodesModule } from 'src/nodes/nodes.module';
import { CanvasesModule } from 'src/canvases/canvases.module';

@Module({
  imports: [NodesModule, CanvasesModule],
  providers: [EventsGateway, EventsService]
})
export class EventsModule {}
