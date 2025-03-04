import { NodeEntity } from 'src/entities/node.entity';

export type CreateNodeParams = {
  name: string;
  parent?: NodeEntity;
};

export type CreatePropertyParams = {
  key: string;
  value: number;
  node?: NodeEntity;
};
