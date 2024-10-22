import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '@/common/entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async findAll(
    @Query('filterBy') filterBy?: string,
    @Query('priority') priority?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('dueDateSort') dueDateSort?: string,
    @Query('isCompleted') isCompleted?: string,
  ): Promise<Todo[]> {
    return await this.todosService.findAll(
      filterBy,
      priority,
      sortOrder,
      dueDateSort,
      isCompleted,
    );
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
  @Delete('completed')
  async deleteAllCompletedTasks() {
    return await this.todosService.deleteCompletedTasks();
  }

  @Delete('/:id')
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    return this.todosService.deleteOne(id);
  }

  @Patch(':id/complete')
  async markAsComplete(@Param('id') id: string) {
    return await this.todosService.updateTaskCompletion(id, true);
  }
}
