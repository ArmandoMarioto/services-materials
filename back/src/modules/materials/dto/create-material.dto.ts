import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateMaterialDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsPositive({ message: 'Quantity must be a positive number' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;
}
