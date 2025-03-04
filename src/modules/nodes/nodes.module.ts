import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEntity } from 'src/entities/node.entity';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  imports: [TypeOrmModule.forFeature([NodeEntity]), PropertiesModule],
  controllers: [NodesController],
  providers: [NodesService],
  exports: [NodesService]
})
export class NodesModule { }
