import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/entities/Material.entity';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { MaterialsRepository } from './repositories/materials.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}
