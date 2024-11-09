import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';

@UseGuards(JwtAuthGuard)
@Controller('services/:serviceId/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(
    @Param('serviceId') serviceId: string,
    @Body() createMaterialDto: CreateMaterialDto,
  ) {
    return this.materialsService.create(+serviceId, createMaterialDto);
  }

  @Get()
  findAll(@Param('serviceId') serviceId: string) {
    return this.materialsService.findAll(+serviceId);
  }

  @Get(':materialId')
  findOne(
    @Param('serviceId') serviceId: string,
    @Param('materialId') materialId: string,
  ) {
    return this.materialsService.findOne(+serviceId, +materialId);
  }

  @Put(':materialId')
  update(
    @Param('serviceId') serviceId: string,
    @Param('materialId') materialId: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(
      +serviceId,
      +materialId,
      updateMaterialDto,
    );
  }

  @Delete(':materialId')
  remove(
    @Param('serviceId') serviceId: string,
    @Param('materialId') materialId: string,
  ) {
    return this.materialsService.remove(+serviceId, +materialId);
  }
}
