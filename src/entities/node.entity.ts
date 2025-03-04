import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  OneToMany,
} from 'typeorm';
import { PropertyEntity } from './properties.entity';
@Entity({ name: 'nodes' })
@Tree('materialized-path')
export class NodeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: NodeEntity[];

  @TreeParent()
  parent: NodeEntity;

  @OneToMany(() => PropertyEntity, (property) => property.node)
  properties: PropertyEntity[];
}
