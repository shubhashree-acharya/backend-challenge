import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeEntity } from '../../entities/node.entity';
import { CreateNodeParams, CreatePropertyParams } from 'src/utils/types';
import { TreeRepository } from 'typeorm';
import { CreateNodeDto } from './dto/createnode.dto';
import { PropertiesService } from '../properties/properties.service';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(NodeEntity)
    private nodeRepository: TreeRepository<NodeEntity>,
    private propertyService: PropertiesService,
  ) { }

  getNode(id: number) {
    return this.nodeRepository.findOne({ where: { id: id }, relations: ['properties'] });
  }
  async getSubTree(id: number) {
    let node = await this.getNode(id);
    if (node) {
      return this.nodeRepository.findDescendantsTree(node, {
        relations: ['properties'],
      });
    }
    else {
      throw new HttpException(
        { status: false, message: 'Data not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async createNode(nodeDetails: CreateNodeDto) {
    let node: CreateNodeParams = { name: nodeDetails.name };
    if (nodeDetails.parentId) {
      let parent = await this.getNode(nodeDetails.parentId);
      if (parent) {
        node.parent = parent;
      } else {
        throw new HttpException(
          { status: false, message: 'Invalid parent id' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    let newNode = await this.nodeRepository.save(node);
    if (nodeDetails.properties && nodeDetails.properties.length) {

      nodeDetails.properties.forEach((item) => {
        let newProperty: CreatePropertyParams = {
          ...item,
          node: newNode,
        };
        this.propertyService.createProperty(
          newProperty, newNode
        );

      })
    }
    return newNode;
  }

  getTree() {
    return this.nodeRepository.findTrees({ relations: ['properties'] });
  }
}
