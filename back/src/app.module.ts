import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...config }),
    ServicesModule,
    MaterialsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
