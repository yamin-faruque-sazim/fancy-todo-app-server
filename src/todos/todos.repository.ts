import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Todo } from 'src/common/entities/todo.entity';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoRepository extends EntityRepository<Todo> {
  constructor(em: EntityManager) {
    super(em, Todo);
  }
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.create(createTodoDto);
    await this.em.persistAndFlush(todo);
    return todo;
  }
}
