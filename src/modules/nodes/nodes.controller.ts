import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateNodeDto } from './dto/createnode.dto';
import { NodesService } from './nodes.service';
import { PropertiesService } from 'src/modules/properties/properties.service';
import { CreatePropertyDto } from 'src/modules/properties/dto/createproperty.dto';
import { ApiResponse } from 'src/utils/apiResponse.service';
import { FindOneParams } from "./dto/findoneparams.dto"
@Controller('nodes')
export class NodesController {
  constructor(
    private nodeService: NodesService,
    private propertyService: PropertiesService,
  ) { }

  @Get()
  getTree() {
    return this.nodeService.getTree();
  }

  @Get(':id')
  async getSubTree(@Param() params: FindOneParams) {
    let tree = await this.nodeService.getSubTree(params.id)
    return ApiResponse(true, tree, 'Data fetch successful');
  }

  @Post(':id/addProperty')
  async addProperties(
    @Body() createPropertyDto: CreatePropertyDto,
    @Param() params: FindOneParams,
  ) {
    let node = await this.nodeService.getNode(params.id);
    let newNode;
    if (node) {
      newNode = this.propertyService.createProperty(createPropertyDto, node);
      return ApiResponse(true, newNode, 'Succesfully created');
    }
    else {
      throw new HttpException(
        { status: false, message: 'Data not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async createNode(@Body() createNodeDto: CreateNodeDto) {
    let newNode = await this.nodeService.createNode(createNodeDto);
    return ApiResponse(true, newNode, 'Succesfully created');
  }
}
