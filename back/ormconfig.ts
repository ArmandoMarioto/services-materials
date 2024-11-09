import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './src/config/database.config';

export const AppDataSource = new DataSource({
  ...(config as DataSourceOptions),
  migrations: [join(__dirname, 'src/migrations/**/*.ts')],
  entities: [join(__dirname, 'src/entities/**/*.ts')],
  migrationsTableName: 'migrations',
});
