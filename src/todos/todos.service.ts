import { Injectable } from '@nestjs/common';

import { CreateTodoDto } from './create-todo.dto';
import { Todo } from 'src/common/entities/todo.entity';
import { TodoRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodos(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.createTodo(createTodoDto);
  }
}
