import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/Service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesRepository } from './repositories/services.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: ServicesRepository,
  ) {}
  create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find({ relations: ['materials'] });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      relations: ['materials'],
      where: { id },
    });
    if (service) {
      return service;
    }
    throw new NotFoundException('Service not found');
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<boolean> {
    const result = await this.serviceRepository.update(
      {
        id,
      },

      {
        ...updateServiceDto,
      },
    );

    if (result.affected > 0) {
      return true;
    } else {
      throw new NotFoundException('Service not found');
    }
  }

  async remove(id: number): Promise<boolean> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    const result = await this.serviceRepository.remove(service);
    return result ? true : false;
  }
}
