import { MikroORM } from '@mikro-orm/core';
import { Todo } from './common/entities/todo.entity';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export default {
  entities: [Todo],
  dbName: 'todo_db',
  driver: PostgreSqlDriver,
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  port: 5432,
  debug: true,
  migrations: {
    path: 'src/db/migrations',
  },
} as Parameters<typeof MikroORM.init>[0];
