import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/Service.entity';
import { ServicesRepository } from './repositories/services.repository';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
