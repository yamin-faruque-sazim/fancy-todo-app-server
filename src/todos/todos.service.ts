import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from './todos.dto';
import { Todo } from '@/common/entities/todo.entity';
import { TodoRepository } from './todos.repository';
import { ETodoPriority } from '@/common/enums/todo-priority.enum';

@Injectable()
export class TodosService {
  constructor(private todosRepository: TodoRepository) {}

  async findAll(
    filterBy: string = '',
    priority: string = '',
    sortOrder: string = 'asc',
    dueDateSort: string = '',
    isCompleted: string = '',
  ): Promise<Todo[]> {
    return await this.todosRepository.findAllFiltered(
      filterBy,
      priority,
      sortOrder,
      dueDateSort,
      isCompleted,
    );
  }

  async createOne(createTodoDto: CreateTodoDto): Promise<Todo> {
    const priorityMap: { [key in keyof typeof ETodoPriority]: number } = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const todoData = {
      ...createTodoDto,
      priority: priorityMap[createTodoDto.priority] || 1,
    };

    const todo = this.todosRepository.create(todoData);
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

  async updateTaskCompletion(id: string, isCompleted: boolean): Promise<Todo> {
    const task = await this.todosRepository.findOneOrFail({ id });
    task.isCompleted = isCompleted;
    await this.todosRepository.getEntityManager().flush();
    return task;
  }

  async deleteCompletedTasks(): Promise<void> {
    await this.todosRepository
      .getEntityManager()
      .nativeDelete(Todo, { isCompleted: true });
  }
}
