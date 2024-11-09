import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function parseDatabaseConfig(): TypeOrmModuleOptions {
  const entities = [join(__dirname, '../**/*.entity{.ts,.js}')];
  const database = process.env.DB_DATABASE ?? 'teste';
  const port = parseInt(process.env.DB_PORT, 10) || 1433;
  const host = process.env.DB_HOST ?? 'localhost';
  const username = process.env.DB_USERNAME ?? 'sa';
  const password = process.env.DB_PASSWORD ?? 'YourStrong!Passw0rd';

  const config: TypeOrmModuleOptions = {
    type: 'mssql',
    host,
    port,
    username,
    password,
    database,
    entities,
    extra: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };

  return config;
}

export const config = parseDatabaseConfig();
