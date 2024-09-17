import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from './todos.dto';
import { Todo } from '@/common/entities/todo.entity';
import { TodoRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todoRepository: TodoRepository) {}

  async createOne(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);

    await this.todoRepository.getEntityManager().persistAndFlush(todo);
    return todo;
  }

  async getTodoById(id: string): Promise<Todo> {
    const foundTodo = await this.todoRepository.findOne({ id: id });
    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return foundTodo;
  }

  async updateOne(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    return await this.todoRepository.updateOne(id, updateTodo);
  }
}
