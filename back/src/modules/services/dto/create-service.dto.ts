import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMaterialDto } from 'src/modules/materials/dto/create-material.dto';

export class CreateServiceDto {
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @IsArray({ message: 'Materials must be an array' })
  @IsOptional()
  materials?: CreateMaterialDto[];
}
