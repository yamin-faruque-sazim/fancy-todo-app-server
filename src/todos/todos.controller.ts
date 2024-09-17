import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '@/common/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return await this.todosService.getAllTodos();
  }

  @Post()
  async createTodos(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createOne(createTodoDto);
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todosService.getTodoById(id);
  }

  @Put('/:id')
  async updateTodoById(
    @Param('id') id: string,
    @Body() updateTodo: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.updateOne(id, updateTodo);
  }
  @Delete('/:id')
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    return this.todosService.deleteOne(id);
  }
}
