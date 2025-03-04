import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreatePropertyDto } from 'src/modules/properties/dto/createproperty.dto';

export class CreateNodeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePropertyDto)
  properties?: CreatePropertyDto[];
}
