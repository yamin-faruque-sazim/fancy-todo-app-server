import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from './todos.dto';
import { Todo } from '@/common/entities/todo.entity';
import { TodoRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todosRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.findAll();
  }

  async createOne(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log(createTodoDto.dueDate);
    const todo = this.todosRepository.create(createTodoDto);

    await this.todosRepository.getEntityManager().persistAndFlush(todo);
    return todo;
  }

  async getTodoById(id: string): Promise<Todo> {
    const foundTodo = await this.todosRepository.findOne({ id: id });
    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return foundTodo;
  }

  async updateOne(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    return await this.todosRepository.updateOne(id, updateTodo);
  }
  async deleteOne(id: string): Promise<void> {
    const todoItem = await this.getTodoById(id);
    await this.todosRepository.getEntityManager().removeAndFlush(todoItem);
  }
}
