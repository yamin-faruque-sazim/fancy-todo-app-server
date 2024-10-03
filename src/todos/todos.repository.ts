import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Todo } from '@/common/entities/todo.entity';
import { UpdateTodoDto } from './todos.dto';

@Injectable()
export class TodoRepository extends EntityRepository<Todo> {
  async updateOne(id: string, updateTodo: UpdateTodoDto): Promise<Todo> {
    const foundTodo = await this.findOne({ id: id });
    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    this.assign(foundTodo, updateTodo);
    await this.getEntityManager().flush();
    return foundTodo;
  }
  async findAllSorted(
    sortBy: string = 'createdAt',
    sortOrder: string = 'asc',
  ): Promise<Todo[]> {
    const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
    return await this.findAll({
      orderBy: { [sortBy]: order },
    });
  }
}
