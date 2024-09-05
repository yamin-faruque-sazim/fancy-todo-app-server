import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todos.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), TodoModule],
})
export class AppModule {}
