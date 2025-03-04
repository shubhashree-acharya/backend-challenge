import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { PropertyEntity } from '../../entities/properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  exports: [PropertiesService],
  providers: [PropertiesService],
})
export class PropertiesModule {}
