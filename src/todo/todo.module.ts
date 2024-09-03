import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from 'src/common/entities/todo.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
})
export class TodoModule {}
