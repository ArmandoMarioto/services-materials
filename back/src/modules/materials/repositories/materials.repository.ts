import { Injectable } from '@nestjs/common';
import { Material } from 'src/entities/Material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialsRepository extends Repository<Material> {}
