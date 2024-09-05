import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from 'src/common/entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoRepository } from './todos.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService, TodoRepository],
})
export class TodoModule {}
