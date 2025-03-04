import { Test, TestingModule } from '@nestjs/testing';
import { NodesService } from './nodes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NodeEntity } from '../../entities/node.entity';
import { PropertiesService } from '../properties/properties.service';
import { PropertyEntity } from '../../entities/properties.entity';

describe('NodesService', () => {
  let service: NodesService;

  const mockNodeRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findTrees: jest.fn(),
    findDescendantsTree: jest.fn(),
  };

  let mockPropertyRepository = {
    save: jest.fn(),
  }
  let rootNode = {
    name: 'AlphaPC',
    id: 1,
  };

  let parentNode = {
    id: 2,
    name: 'Processing',
    parentId: 1,
  };

  let childNode = {
    id: 3,
    name: 'CPU',
    parentId: 2,
  };

  jest.spyOn(mockNodeRepository, 'save').mockReturnValue(rootNode);
  jest.spyOn(mockNodeRepository, 'save').mockReturnValue(parentNode);
  jest.spyOn(mockNodeRepository, 'save').mockReturnValue(childNode);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        NodesService,
        PropertiesService,
        {
          provide: getRepositoryToken(NodeEntity),

          useValue: mockNodeRepository,
        },
        {
          provide: getRepositoryToken(PropertyEntity),
          useValue: mockPropertyRepository,
        }
      ],
    }).compile();

    service = module.get<NodesService>(NodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getNode => Should return node of given id', async () => {
    const expectedResult = {
      name: 'AlphaPC',
      id: 1,
    };

    jest.spyOn(mockNodeRepository, 'findOne').mockReturnValue(expectedResult);

    const result = await service.getNode(1);

    expect(mockNodeRepository.findOne).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('createNode => Should create a new node and return its data', async () => {
    jest.spyOn(mockNodeRepository, 'save').mockReturnValue(rootNode);

    const result = await service.createNode(rootNode);

    expect(mockNodeRepository.save).toHaveBeenCalled();
    expect(mockNodeRepository.save).toHaveBeenCalledWith({name:rootNode.name});
    expect(result).toEqual(rootNode);
  });

  it('getTree => should return an array of nodes', async () => {
    const expectedResult = [
      {
        id: 1,
        name: 'AlphaPC',
        children: [
          {
            id: 2,
            name: 'Processing',
            children: [],
          },
        ],
      },
    ];
    jest.spyOn(mockNodeRepository, 'findTrees').mockReturnValue(expectedResult);

    const result = await service.getTree();

    expect(result).toEqual(expectedResult);
    expect(mockNodeRepository.findTrees).toHaveBeenCalled();
  });

  it('getSubTree => should return sub tree of given id ', async () => {
    const expectedResult = [
      {
        id: 2,
        name: 'Processing',
        children: [{ id: 3, name: 'CPU', children: [] }],
      },
    ];
    jest.spyOn(mockNodeRepository, 'findOne').mockReturnValue(rootNode);
    jest.spyOn(mockNodeRepository, 'findDescendantsTree').mockReturnValue(expectedResult);
    const result = await service.getSubTree(parentNode.id);

    expect(result).toEqual(expectedResult);
    expect(mockNodeRepository.findTrees).toHaveBeenCalled();
  });
});
