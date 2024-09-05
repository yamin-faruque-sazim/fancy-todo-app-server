import { Body, Controller, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from 'src/common/entities/todo.entity';

import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async createTodos(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.createTodos(createTodoDto);
  }
}
