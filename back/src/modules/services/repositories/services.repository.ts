import { Injectable } from '@nestjs/common';
import { Service } from 'src/entities/Service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesRepository extends Repository<Service> {}
