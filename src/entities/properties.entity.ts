import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { NodeEntity } from './node.entity';

@Entity({ name: 'properties' })
export class PropertyEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  key: string;

  @Column()
  value: number;

  @ManyToOne(() => NodeEntity, (node) => node.properties)
  node: NodeEntity;
}
