import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { NodeEntity } from '../../../entities/node.entity';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => NodeEntity)
  node?: NodeEntity;
}
