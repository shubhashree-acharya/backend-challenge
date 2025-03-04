import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeEntity } from '../../entities/node.entity';
import { PropertyEntity } from '../../entities/properties.entity';
import { CreatePropertyParams } from 'src/utils/types';
import { Repository } from 'typeorm';
@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(PropertyEntity)
    private propertyRepository: Repository<PropertyEntity>,
  ) { }

  async createProperty(propertyDetails: CreatePropertyParams, node: NodeEntity) {
    return this.propertyRepository.save({
      ...propertyDetails,
      node: node,
    });
  }

}

