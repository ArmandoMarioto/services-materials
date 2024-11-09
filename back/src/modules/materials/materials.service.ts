import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from 'src/entities/Material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsRepository } from './repositories/materials.repository';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialsRepository: MaterialsRepository,
  ) {}
  async create(
    serviceId: number,
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const material = await this.materialsRepository.create({
      ...createMaterialDto,
      service: { id: serviceId },
    });
    return this.materialsRepository.save(material);
  }

  findAll(serviceId: number): Promise<Material[]> {
    return this.materialsRepository.find({
      where: {
        service: { id: serviceId },
      },
    });
  }

  async findOne(serviceId: number, id: number): Promise<Material> {
    const material = await this.materialsRepository.findOne({
      where: { id, service: { id: serviceId } },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }

  async update(
    serviceId: number,
    id: number,
    updateMaterialDto: UpdateMaterialDto,
  ): Promise<boolean> {
    const result = await this.materialsRepository.update(
      {
        id,
        service: { id: serviceId },
      },

      {
        ...updateMaterialDto,
      },
    );

    if (result.affected > 0) {
      return true;
    } else {
      throw new NotFoundException('Material not found');
    }
  }

  async remove(serviceId: number, id: number): Promise<boolean> {
    const material = await this.materialsRepository.findOne({
      where: { id, service: { id: serviceId } },
    });
    if (!material) {
      throw new NotFoundException('Material not found');
    }
    const result = await this.materialsRepository.remove(material);
    return result ? true : false;
  }
}
