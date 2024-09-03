import { MikroORM } from '@mikro-orm/core';
import { Todo } from './common/entities/todo.entity';

export default {
  entities: [Todo],
  dbName: process.env.DATABASE_NAME,
  type: 'postgresql',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
