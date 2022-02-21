import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { Post } from './modules/post/models/post.model';
import { User } from './modules/user/models/user.model';

const connectionOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Post],
  subscribers: [],
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
  logger: 'advanced-console',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: './migrations',
  },
  // dateStrings: ['DATETIME'],
  extra: {
    connectionLimit: 10,
  },
  keepConnectionAlive: true,
  maxQueryExecutionTime: 1000,
};

export = connectionOptions;
